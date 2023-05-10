import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { documentService } from "../services/documentService";

export const documentController = {
  //GET /documents
  show: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id;
    try {
      const documents = await documentService.findDocument(userId);
      return res.json(documents);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
