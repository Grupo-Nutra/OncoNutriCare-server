const Sequelize = require('sequelize');
const db = require('../util/db');
const Paciente = require('./patient');

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
    peso: {
        type: Sequelize.DECIMAL(5,2),
        allowNull: false,
    },
    gordura: {
        type: Sequelize.DECIMAL(4,2),
    },
    hemoglobina: {
        type: Sequelize.DECIMAL(3,1),
    },
    leucocitos: {
        type: Sequelize.INTEGER,
    },
    plaquetas: {
        type: Sequelize.INTEGER,
    },
    nauseas: {
        type: Sequelize.ENUM('Não', 'Antecipatória', 'Aguda', 'Tardia'),
        allowNull: false,
    },
    vomitos: {
        type: Sequelize.ENUM('Não', 'Antecipatória', 'Aguda', 'Tardia'),
        allowNull: false,
    },
    diagnosticoNutri: {
        type: Sequelize.ENUM('Baixo peso', 'Desnutrição', 'Caquexia', 'Miopenia', 'Sarcopenia', 'Sobrepeso', 'Obesidade', 'Obesidade Sarcopênica'),
        allowNull: false,
    },
    inapetencia: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
    },
    mucosite: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
    },
    diarreia: {
        type: Sequelize.ENUM('Sim', 'Não', 'Diarreia Aguda'),
        allowNull: false,
    },
    constipacao: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
    },
    alteracaoPaladar: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
    },
    riscoNutricional: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
    },
    nivelRisco: {
        type: Sequelize.ENUM('Baixo', 'Moderado', 'Alto'),
    },
    statusTno: {
        type: Sequelize.ENUM('Sim', 'Não'),
        allowNull: false,
    },
    adesaoTno: {
        type: Sequelize.ENUM('0%', '25%', '50%', '75%', '100%'),
    },
    aceitacaoAlimentar: {
        type: Sequelize.ENUM('0 a 20%', '40%', '60%', '80%', '90 a 100%'),
    },
    planoTerapeutico: {
        type: Sequelize.STRING(500),
    },
    conduta: {
        type: Sequelize.STRING(500),
    },
});

// estabelecendo relacionamento
Consulta.belongsTo(Paciente, { 
    constraint: true, 
    foreignKey: 'idPaciente',
    onDelete: 'CASCADE' 
});

Paciente.hasMany(Consulta, { 
    foreignKey: 'idPaciente' 
});

module.exports = Consulta;