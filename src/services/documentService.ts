import { Document, DocumentCreationAttributes } from "../models/Document";

export const documentService = {
  create: async (attributes: DocumentCreationAttributes) => {
    const document = await Document.create(attributes);
    return document;
  },

  delete: async (id: number) => {
    await Document.destroy({ where: { id } });
  },

  findDocument: async (userId: number) => {
    const document = await Document.findOne({
      where: { userId },
      attributes: ["id", "document", ["user_id", "userId"]],
    });

    return document;
  },

  updateDocument: async (id: number, userId: number, document: string) => {
    const [affectedRows, updateDocument] = await Document.update(
      { document },
      {
        where: { id, userId },
        returning: true,
      }
    );

    return updateDocument[0];
  },
};
