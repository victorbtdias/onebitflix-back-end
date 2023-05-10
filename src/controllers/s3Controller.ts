import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { Document } from "../models";
import { documentService } from "../services/documentService";

const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFile, deleteFile } = require("../s3");

export const s3Controller = {
  //POST /images
  createAndUpload: async (req: AuthenticatedRequest | any, res: Response) => {
    const userId = req.user!.id;
    const file = req.file;
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    try {
      const createDocument = await documentService.create({
        document: fileName,
        userId,
      });
      const result = await uploadFile(file, fileName);
      await unlinkFile(file.path);

      res
        .status(201)
        .json({ document: createDocument, imagePath: `/images/${result.Key}` });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  },

  //GET /images/:key
  getImageByKey: async (req: AuthenticatedRequest, res: Response) => {
    const key = req.params.key;
    const readStream = getFile(key);

    readStream.pipe(res);
  },

  //DELETE /images/remove/:id?document=
  remove: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const key = req.query.document;

    try {
      const document = await Document.findByPk(id);

      if (document) {
        await documentService.delete(Number(id));
      } else {
        throw new Error(`Não foi possível encontrar esse documento`);
      }
      await deleteFile(key);

      return res.status(204).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
