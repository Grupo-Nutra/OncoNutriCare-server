const controller = require('../controllers/appointmentsController');
const router = require('express').Router();

router.post('/appointments', controller.createAppointment);
router.get('appointments/:appointmentId', controller.getAppointment);
router.get('/appointments/:patientId', controller.getAppointmentsByPatient);
router.put('/appointments/:appointmentId', controller.updateAppointments);
router.delete('/appointments/:appointmentId', controller.deleteAppointments);

module.exports = router;