const User = require('../models/User');

exports.getMemberForm = (req, res) => {
  res.render('becomeMember', { errors: [] });
};

exports.postMemberUpgrade = async (req, res) => {
  try {
    const { passcode } = req.body;
    if (passcode === process.env.MEMBERSHIP_PASSCODE) {
      await User.updateMembership(req.user.id, true);
      return res.redirect('/');
    }
    res.render('becomeMember', { errors: [{ msg: 'Incorrect passcode' }] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getAdminForm = (req, res) => {
  res.render('becomeAdmin', { errors: [] });
};

exports.postAdminUpgrade = async (req, res) => {
  try {
    const { passcode } = req.body;
    if (passcode === process.env.ADMIN_PASSCODE) {
      await User.updateAdmin(req.user.id, true);
      return res.redirect('/');
    }
    res.render('becomeAdmin', { errors: [{ msg: 'Incorrect passcode' }] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
