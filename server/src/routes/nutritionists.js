const controller = require('../controllers/nutritionistsController');
const router = require('express').Router();

router.post('/nutritionists', controller.createNutritionist);
router.get('/nutritionists/:nutritionistId', controller.getNutritionist);
router.put('/nutritionists/:nutritionistId', controller.updateNutritionist);
router.delete('/nutritionists/:nutritionistId', controller.deleteNutritionist);

module.exports = router;