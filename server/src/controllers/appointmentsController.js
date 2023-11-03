const Consulta = require('../models/appointment');
const log = require('../util/logger');

//create
exports.createAppointment = async (req, res) => {
    const { idPaciente, data, peso, gordura, hemoglobina, leucocitos, plaquetas, nauseas, vomitos, mucosite, diarreia, constipacao, alteracaoPaladar, adesaoTno, aceitacaoAlimentar, diagnosticoNutri, inapetencia, riscoNutricional, statusTno, planoTerapeutico, tratamento } = req.body;

    try {
        const appointment = await Consulta.create({
            idPaciente: idPaciente,
            data: data,
            peso: peso,
            gordura: gordura,
            hemoglobina: hemoglobina,
            leucocitos: leucocitos,
            plaquetas: plaquetas,
            nauseas: nauseas,
            vomitos: vomitos,
            mucosite: mucosite,
            diarreia: diarreia,
            constipacao: constipacao,
            alteracaoPaladar: alteracaoPaladar,
            adesaoTno: adesaoTno,
            aceitacaoAlimentar: aceitacaoAlimentar,
            diagnosticoNutri: diagnosticoNutri,
            inapetencia: inapetencia,
            riscoNutricional: riscoNutricional,
            statusTno: statusTno,
            planoTerapeutico: planoTerapeutico,
            tratamento: tratamento
        });
        res.status(201).json(appointment);
    } catch (err) {
        log.error('Erro ao criar consulta:', err);
        res.status(500).json({ message: 'Erro ao criar consulta.' });
    }
};

//read
exports.getAppointment = async (req, res) => {
    const idConsulta = req.params.idConsulta;

    try {
        const appointment = await Consulta.findByPk(idConsulta);
        if (!appointment) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        res.status(200).json(appointment);
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

        res.status(200).json(consultas);
    } catch (err) {
        log.error('Erro ao buscar consultas do paciente:', err);
        res.status(500).json({ message: 'Erro ao buscar consultas do paciente.' });
    }
};

//update
exports.updateAppointment = async (req, res) => {
    const idConsulta = req.params.idConsulta;
    const { data, peso, gordura, hemoglobina, leucocitos, plaquetas, nauseas, vomitos, mucosite, diarreia, constipacao, alteracaoPaladar, adesaoTno, aceitacaoAlimentar, diagnosticoNutri, inapetencia, riscoNutricional, statusTno, planoTerapeutico, tratamento } = req.body;

    try {
        const appointment = await Consulta.findByPk(idConsulta);
        if (!appointment) {
            return res.status(404).json({ message: 'Consulta não encontrada.' });
        }
        appointment.data = data;
        appointment.hora = hora;
        appointment.peso = peso;
        appointment.gordura = gordura;
        appointment.hemoglobina = hemoglobina;
        appointment.leucocitos = leucocitos;
        appointment.plaquetas = plaquetas;
        appointment.nauseas = nauseas;
        appointment.vomitos = vomitos;
        appointment.mucosite = mucosite;
        appointment.diarreia = diarreia;
        appointment.constipacao = constipacao;
        appointment.alteracaoPaladar = alteracaoPaladar;
        appointment.adesaoTno = adesaoTno;
        appointment.aceitacaoAlimentar = aceitacaoAlimentar;
        appointment.diagnosticoNutri = diagnosticoNutri;
        appointment.inapetencia = inapetencia;
        appointment.riscoNutricional = riscoNutricional;
        appointment.statusTno = statusTno;
        appointment.planoTerapeutico = planoTerapeutico;
        appointment.tratamento = tratamento;

        const updatedAppointment = await appointment.save();
        res.status(200).json(updatedAppointment);
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
        res.status(200).json({ message: 'Consulta removida com sucesso.' });
    } catch (err) {
        log.error('Erro ao remover consulta:', err);
        res.status(500).json({ message: 'Erro ao remover consulta.' });
    }
};
