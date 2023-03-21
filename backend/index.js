const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsConfig));

mongoose.connect(process.env.DATABASE_CONNECTION_URL);

const jwt_secret = 'dadjkaksfjkalfjdfjnafjdsjkajfnjs';

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {

    const newuser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password)
    });
    res.json(newuser);
  } catch (e) {
    res.status(422).json(e);
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign({ email: user.email, id: user._id }, jwt_secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(user);
      });
    } else {
      res.json("password not matched");
    }
  } else {
    res.json("user not found");
  }
})

app.listen(4000);