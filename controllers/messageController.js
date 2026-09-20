const Message = require('../models/Message');

exports.postMessage = async (req, res) => {
  try {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.redirect('/');
    }
    await Message.create({ title, text, userId: req.user.id });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await Message.delete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
