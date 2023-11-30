const log = require('../util/logger');
const Nutricionista = require('../models/nutritionist');

//create
exports.createNutritionist = async (req, res) => {
    const { idNutricionista, crnSigla, crnNumero, nomeCompleto, telefone, email, sexo, dtNascimento } = req.body;

    try {
        const nutritionist = await Nutricionista.create({
            idNutricionista: idNutricionista,
            crnSigla: crnSigla,
            crnNumero: crnNumero,
            nomeCompleto: nomeCompleto,
            telefone: telefone,
            sexo: sexo,
            dtNascimento: dtNascimento,
            email: email
        });
        res.status(201).json(nutritionist);
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
        res.status(200).json(nutritionist);
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
        res.status(200).json(updatedNutritionist);
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
    } catch (err) {
        log.error('Erro ao remover nutricionista:', err);
        res.status(500).json({ message: 'Erro ao remover nutricionista.' });
    }
}
