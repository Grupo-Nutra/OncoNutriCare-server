const controller = require('../controllers/appointmentsController');
const router = require('express').Router();

router.post('/appointments', controller.createAppointment);
router.get('appointments/:appointmentId', controller.getAppointment);
router.get('/appointments/patients/:patientId', controller.getAppointmentsByPatient);
router.put('/appointments/:appointmentId', controller.updateAppointment);
router.delete('/appointments/:appointmentId', controller.deleteAppointment);

module.exports = router;