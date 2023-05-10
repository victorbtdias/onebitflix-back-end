import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Document {
  id: number;
  document: string;
  userId: number;
}

export interface DocumentCreationAttributes extends Optional<Document, "id"> {}

export interface DocumentInstance
  extends Model<Document, DocumentCreationAttributes>,
    Document {}

export const Document = sequelize.define<DocumentInstance, Document>(
  "Document",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    document: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  }
);
