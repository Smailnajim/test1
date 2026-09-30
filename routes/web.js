const exress = require("express");
const router = exress.Router();
const { patientValidationRules, validate } = require('../middleware/validators/patientValidator');


//auth routes
router.post("/register", patientValidationRules, validate, (req, res) => {
  const validBody = req.validated;
  
});

module.exports = router;