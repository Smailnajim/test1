const appointmentService = require('../service/appointmentService');

const createAppointment = async (req, res) => {
  const validBody = { ...(req.validated || {}) };
  const userId = req.account && req.account.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const appointment = await appointmentService.createAppointment({
      ...validBody,
      createdBy: userId,
    });

    return res.status(201).json({
      message: 'Appointment created successfully',
      data: appointment,
    });
  } catch (err) {
    if (err && err.name === 'NotFoundError') {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (err && err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }

    if (err && err.name === 'SequelizeValidationError') {
      const errors = err.errors ? err.errors.map((e) => e.message) : [];
      return res.status(400).json({ message: 'Validation error', errors });
    }

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAppointment,
};
