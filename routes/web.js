const exress = require("express");
const router = exress.Router();
const { patientValidationRules, validate } = require('../middleware/validators/patientValidator');


//auth routes
router.post("/register", patientValidationRules, validate, (req, res) => {
  const { email, password, fullName, CIN, phone, birthDate, address } = req.validated;
  res.status(200).json({ message: "User registered successfully", data: req.validated });
});

module.exports = router;