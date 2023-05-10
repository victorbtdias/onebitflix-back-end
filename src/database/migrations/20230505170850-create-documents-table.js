"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      document: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("documents");
  },
};
