const log = require('../util/logger');
const Nutricionista = require('../models/nutritionist');

//create
exports.createNutritionist = async (req, res) => {
    const { crnSigla, crnNumero, nomeCompleto, telefone, email } = req.body;

    try {
        const nutritionist = await Nutricionista.create({
            crnSigla: crnSigla,
            crnNumero: crnNumero,
            nomeCompleto: nomeCompleto,
            telefone: telefone,
            email: email
        });
        res.status(201).json({ message: 'Nutricionista criado com sucesso.', nutritionist: nutritionist });
        log.info('Nutricionista criado com sucesso:', nutritionist.idNutricionista);
    } catch (err) {
        log.error('Erro ao criar nutricionista:', err);
        res.status(500).json({ message: 'Erro ao criar nutricionista.' });
    }
}

//read
exports.getNutritionist = async (req, res) => {
    const nutritionistId = req.params.nutritionistId;

    try {
        const nutritionist = await Nutricionista.findByPk(nutritionistId);
        if (!nutritionist) {
            return res.status(404).json({ message: 'Nutricionista não encontrado.' });
        }
        res.status(200).json({ nutritionist: nutritionist });
        log.info('Nutricionista encontrado.', nutritionist.idNutricionista);
    } catch (err) {
        log.error(err); // Usando o logger para registrar o erro
        res.status(500).json({ message: 'Erro ao buscar nutricionista.' });
    }
}

//update
exports.updateNutritionist = async (req, res) => {
    const nutritionistId = req.params.nutritionistId;
    const { crnSigla, crnNumero, nomeCompleto, telefone, email } = req.body;

    try {
        const nutritionist = await Nutricionista.findByPk(nutritionistId);
        if (!nutritionist) {
            return res.status(404).json({ message: 'Nutricionista não encontrado.' });
        }
        nutritionist.crnSigla = crnSigla;
        nutritionist.crnNumero = crnNumero;
        nutritionist.nomeCompleto = nomeCompleto;
        nutritionist.telefone = telefone;
        nutritionist.email = email;

        const updatedNutritionist = await nutritionist.save();
        res.status(200).json({ message: 'Nutricionista atualizado com sucesso.', nutritionist: updatedNutritionist });
        log.info('Nutricionista atualizado com sucesso:', updatedNutritionist.idNutricionista);
    } catch (err) {
        log.error('Erro ao atualizar nutricionista:', err);
        res.status(500).json({ message: 'Erro ao atualizar nutricionista.' });
    }
}

//delete
exports.deleteNutritionist = async (req, res) => {
    const nutritionistId = req.params.nutritionistId;

    try {
        const nutritionist = await Nutricionista.findByPk(nutritionistId);
        if (!nutritionist) {
            return res.status(404).json({ message: 'Nutricionista não encontrado.' });
        }
        await nutritionist.destroy();
        res.status(200).json({ message: 'Nutricionista removido com sucesso.' });
        log.info('Nutricionista removido com sucesso:', nutritionistId);
    } catch (err) {
        log.error('Erro ao remover nutricionista:', err);
        res.status(500).json({ message: 'Erro ao remover nutricionista.' });
    }
}
