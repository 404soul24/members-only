function isAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    return next();
  }
  res.status(403).send('Access denied. Admin only.');
}

module.exports = isAdmin;
