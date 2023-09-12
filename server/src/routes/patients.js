const controller = require('../controllers/patientsController');
const router = require('express').Router();

router.post('/patients', controller.createPatient);
router.get('/patients/:patientId', controller.getPatient);
router.get('/patients/:nutritionistId', controller.getPatientsbyNutritionist);
router.put('/patients/:patientId', controller.updatePatient);
router.delete('/patients/:patientId', controller.deletePatient);

module.exports = router;