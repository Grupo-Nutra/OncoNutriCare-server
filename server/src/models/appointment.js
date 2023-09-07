const Sequelize = require('sequelize');
const db = require('../util/db');
const Paciente = require('./patients');

const Consulta = db.define('Consulta', {
    idConsulta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    hora: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    peso: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
    },
    diagonosticoNutri: {
        type: Sequelize.ENUM('Baixo peso', 'Desnutrição', 'Caquexia', 'Miopenia', 'Sarcopenia', 'Sobrepeso', 'Obesidade'),
        allowNull: false,
    },
    inapetencia: {
        type: Sequelize.ENUM('Sim', 'Não'),
    },
    riscoNutricional: {
        type: Sequelize.ENUM('Sim', 'Não'),
    },
    statusTno: {
        type: Sequelize.ENUM('Sim', 'Não'),
    },
    planoTeraoeutico: {
        type: Sequelize.STRING(350),
    }, 
    Tratamento: {
        type: Sequelize.STRING,
    },
    idPaciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Paciente',
            key: 'idPaciente',
        }
    },
});

// estabelecendo relacionamento
Consulta.belogsTo(Paciente, { foreignKey: 'idPaciente' });

module.exports = Consulta;