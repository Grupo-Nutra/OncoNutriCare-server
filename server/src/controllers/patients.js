const log = require('../util/logger');
const Paciente = require('../models/patient');

// read all
exports.getPatients = async (_, res) => {
    try {
        const patients = await Paciente.findAll();
        res.status(200).json({ patients: patients });
        log.info('Consulta bem-sucedida: Lista de pacientes recuperada.');
    } catch (err) {
        log.error('Erro ao buscar pacientes:', err);
        res.status(500).json({ message: 'Erro ao buscar pacientes.' });
    }
}

// read
exports.getPatient = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const patient = await Paciente.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        res.status(200).json({ patient: patient });
        log.info('Paciente encontrado.', patient.idPaciente);
    } catch (err) {
        log.error(err); // Usando o logger para registrar o erro
        res.status(500).json({ message: 'Erro ao buscar paciente.' });
    }
}

// create
exports.createPatient = async (req, res) => {
    const { nomeCompleto, dtNascimento, numeroProntuario, sexo, telefone, email, diagnosticoOnco } = req.body;

    try {
        const patient = await Paciente.create({
            nomeCompleto: nomeCompleto,
            dtNascimento: dtNascimento,
            numeroProntuario: numeroProntuario,
            sexo: sexo,
            telefone: telefone,
            email: email,
            diagnosticoOnco: diagnosticoOnco
        });
        res.status(201).json({ message: 'Paciente criado com sucesso.', patient: patient });
        log.info('Paciente criado com sucesso:', patient.idPaciente);
    } catch (err) {
        log.error('Erro ao criar paciente:', err);
        res.status(500).json({ message: 'Erro ao criar paciente.' });
    }
}

// update
exports.updatePatient = async (req, res) => {
    const patientId = req.params.patientId;
    const { nomeCompleto, dtNascimento, numeroProntuario, sexo, telefone, email, diagnosticoOnco } = req.body;

    try {
        const patient = await Paciente.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        patient.nomeCompleto = nomeCompleto;
        patient.dtNascimento = dtNascimento;
        patient.numeroProntuario = numeroProntuario;
        patient.sexo = sexo;
        patient.telefone = telefone;
        patient.email = email;
        patient.diagnosticoOnco = diagnosticoOnco;

        const updatedPatient = await patient.save();
        res.status(200).json({ message: 'Paciente atualizado com sucesso.', patient: updatedPatient });
        log.info('Paciente atualizado com sucesso:', updatedPatient.idPaciente);
    } catch (err) {
        log.error('Erro ao atualizar paciente:', err);
        res.status(500).json({ message: 'Erro ao atualizar paciente.' });
    }
}

// delete
exports.deletePatient = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const patient = await Paciente.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado.' });
        }
        await patient.destroy();
        res.status(200).json({ message: 'Paciente removido com sucesso.' });
        log.info('Paciente removido com sucesso:', patientId);
    } catch (err) {
        log.error('Erro ao remover paciente:', err);
        res.status(500).json({ message: 'Erro ao remover paciente.' });
    }
}