const Tratamento = require('../models/treatment');
const log = require('../util/logger');

//create
exports.createTreatment = async (req, res) => {
    const { idPaciente, tipo, medicamentos } = req.body;

    try {
        const treatment = await Tratamento.create({
            idPaciente: idPaciente,
            tipo: tipo,
            medicamentos: medicamentos            
        });
        res.status(201).json(treatment);
    } catch (err) {
        log.error('Erro ao criar tratamento:', err);
        res.status(500).json({ message: 'Erro ao criar tratamento.' });
    }
};

//read
exports.getTreatment = async (req, res) => {
    const idTreatment = req.params.treatmentId;

    try {
        const treatment = await Tratamento.findByPk(idTreatment);
        if (!treatment) {
            return res.status(404).json({ message: 'Tratamento não encontrado.' });
        }
        res.status(200).json(treatment);
    } catch (err) {
        log.error(err);
        res.status(500).json({ message: 'Erro ao buscar tratamento.' });
    }
}

//read all
exports.getTreatmentsByPatient = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const treatments = await Tratamento.findAll({
            where: { idPaciente: patientId },
        });

        if (!treatments) {
            return res.status(404).json({ message: 'Nenhum tratamento encontrada para este paciente.' });
        }

        res.status(200).json(treatments);
    } catch (err) {
        log.error('Erro ao buscar tratamentos do paciente:', err);
        res.status(500).json({ message: 'Erro ao buscar tratamentos do paciente.' });
    }
};

//update
exports.updateTreatment = async (req, res) => {
    const idTreatment = req.params.treatmentId;
    const { tipo, medicamentos } = req.body;

    try {
        const treatment = await Tratamento.findByPk(idTreatment);
        if (!treatment) {
            return res.status(404).json({ message: 'Tratamento não encontrada.' });
        }
        treatment.tipo = tipo;
        treatment.medicamentos = medicamentos;
     
        const updatedTreatment = await treatment.save();
        res.status(200).json(updatedTreatment);
    } catch (err) {
        log.error('Erro ao atualizar tratamento:', err);
        res.status(500).json({ message: 'Erro ao atualizar tratamento.' });
    }
}

//delete
exports.deleteTreatment = async (req, res) => {
    const treatmentId = req.params.treatmentId;

    try {
        const treatment = await Tratamento.findByPk(treatmentId);

        if (!treatment) {
            return res.status(404).json({ message: 'Tratamento não encontrado.' });
        }
        await treatment.destroy();
        res.status(200).json({ message: 'Tratamento removido com sucesso.' });
    } catch (err) {
        log.error('Erro ao remover tratamento:', err);
        res.status(500).json({ message: 'Erro ao remover tratamento.' });
    }
};
