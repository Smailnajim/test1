const exress = require("express");
const router = exress.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
    res.status(200).json({ message: "Login successful" });
});

module.exports = router;