const controller = require('../controllers/treatmentsController');
const router = require('express').Router();

router.post('/treatments', controller.createTreatment);
router.get('/treatments/:treatmentId', controller.getTreatment);
router.get('/treatments/patient/:patientId', controller.getTreatmentsByPatient);
router.put('/treatments/:treatmentId', controller.updateTreatment);
router.delete('/treatments/:treatmentId', controller.deleteTreatment);

module.exports = router;