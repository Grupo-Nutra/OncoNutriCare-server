const Sequelize = require('sequelize');
const db = require('../util/db');

const Nutricionista = db.define('Nutricionista', {
    idNutricionista: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    crnSigla: {
        type: Sequelize.ENUM('CRN-1', 'CRN-2', 'CRN-3', 'CRN-4', 'CRN-5', 'CRN-6', 'CRN-7', 'CRN-8', 'CRN-9', 'CRN-10', 'CRN-11'),
        allowNull: false,
    },
    crnNumero: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE
    },
      updatedAt: {
        type: Sequelize.DATE
    },
},  {
        indexes: [
            {
                unique: true,
                fields: ['crnSigla', 'crnNumero']
            }
        ]
});

module.exports = Nutricionista;