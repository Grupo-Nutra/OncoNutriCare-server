const controller = require('../controllers/patients');
const router = require('express').Router();

router.get('/patients', controller.getPatients);
router.get('/patients/:patientId', controller.getPatient);
router.post('/patients', controller.createPatient);
router.put('/patients/:patientId', controller.updatePatient);
router.delete('/patients/:patientId', controller.deletePatient);

module.exports = router;