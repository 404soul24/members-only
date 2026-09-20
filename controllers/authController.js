const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

const validationRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 100 })
    .withMessage('First name must be under 100 characters')
    .escape(),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 100 })
    .withMessage('Last name must be under 100 characters')
    .escape(),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Please confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

exports.getSignUp = (req, res) => {
  res.render('signUp', { errors: [], formData: {} });
};

exports.postSignUp = [
  ...validationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('signUp', {
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      const existingUser = await User.findByUsername(req.body.username);
      if (existingUser) {
        return res.render('signUp', {
          errors: [{ msg: 'Email already registered' }],
          formData: req.body,
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
      });

      res.redirect('/login');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
];

exports.getLogin = (req, res) => {
  res.render('login', { errors: [] });
};

exports.postLogin = (req, res, next) => {
  const passport = require('passport');
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('login', {
        errors: [{ msg: info.message }],
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
