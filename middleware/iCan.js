function iCan(roles = []) {
  const allowedRoles = Array.isArray(roles) ? roles.map((role) => String(role)) : [];

  return (req, res, next) => {
    if (!req.account) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!allowedRoles.includes(String(req.account.role))) {
      return res.status(403).json({
        message: 'Forbidden',
        allowedRoles,
      });
    }

    next();
  };
}

module.exports = {
  iCan,
};
