const exress = require("express");
const router = exress.Router();


//auth routes
router.post("/register", (req, res) => {
  const { email, password, fullName, CIN, phone, birthDate, address } = req.body;
    res.status(200).json({ message: "User registered successfully" });
});




 (optionnel)

module.exports = router;