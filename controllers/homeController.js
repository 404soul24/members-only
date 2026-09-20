const Message = require('../models/Message');

exports.getIndex = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.render('index', {
      user: req.user || null,
      messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
