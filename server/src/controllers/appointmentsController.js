const Consulta = require('../models/appointment');
const log = require('../util/logger');

//create
exports.createAppointment = async (req, res) => {
    const { data, hora, peso, diagnosticoNutri, inapetencia, riscoNutricional, statusTno, planoTerapeutico, tratamento } = req.body;

    try {
        const appointment = await Consulta.create({
            data: data,
            hora: hora,
            peso: peso,
            diagnosticoNutri: diagnosticoNutri,
            inapetencia: inapetencia,
            riscoNutricional: riscoNutricional,
            statusTno: statusTno,
            planoTerapeutico: planoTerapeutico,
            tratamento: tratamento
        });
        log.info('Consulta criada com sucesso:', appointment);
        res.status(201).json({ message: 'Consulta criada com sucesso.', appointment });
    } catch (err) {
        log.error('Erro ao criar consulta:', err);
        res.status(500).json({ message: 'Erro ao criar consulta.' });
    }
};

//read
exports.getAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const appointment = await Consulta.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        res.status(200).json({ appointment: appointment });
        log.info('Consulta encontrada.', appointment.idConsulta);
    } catch (err) {
        log.error(err);
        res.status(500).json({ message: 'Erro ao buscar consulta.' });
    }
}

//read all
exports.getAppointmentsByPatient = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const consultas = await Consulta.findAll({
            where: { idPaciente: patientId },
        });

        if (!consultas) {
            return res.status(404).json({ message: 'Nenhuma consulta encontrada para este paciente.' });
        }

        log.info('Consultas encontradas para o paciente:', consultas);
        res.status(200).json({ consultas });
    } catch (err) {
        log.error('Erro ao buscar consultas do paciente:', err);
        res.status(500).json({ message: 'Erro ao buscar consultas do paciente.' });
    }
};

//update
exports.updateAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const { data, hora, peso, diagnosticoNutri, inapetencia, riscoNutricional, statusTno, planoTerapeutico, tratamento } = req.body;

    try {
        const appointment = await Consulta.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        appointment.data = data;
        appointment.hora = hora;
        appointment.peso = peso;
        appointment.diagnosticoNutri = diagnosticoNutri;
        appointment.inapetencia = inapetencia;
        appointment.riscoNutricional = riscoNutricional;
        appointment.statusTno = statusTno;
        appointment.planoTerapeutico = planoTerapeutico;
        appointment.tratamento = tratamento;


        const updatedAppointment = await appointment.save();
        res.status(200).json({ message: 'Consulta atualizada com sucesso.', appointment: updatedAppointment });
        log.info('Consulta atualizada com sucesso:', updatedAppointment.idConsulta);
    } catch (err) {
        log.error('Erro ao atualizar consulta:', err);
        res.status(500).json({ message: 'Erro ao atualizar consulta.' });
    }
}

//delete
exports.deleteAppointment = async (req, res) => {
    const consultaId = req.params.consultaId;

    try {
        const consulta = await Consulta.findByPk(consultaId);

        if (!consulta) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        await consulta.destroy();
        log.info('Consulta removida com sucesso.');
        res.status(200).json({ message: 'Consulta removida com sucesso.' });
    } catch (err) {
        log.error('Erro ao remover consulta:', err);
        res.status(500).json({ message: 'Erro ao remover consulta.' });
    }
};
