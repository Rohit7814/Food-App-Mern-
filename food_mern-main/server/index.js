const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const registerRoute = require('./Routes/Register');
const loginRoute = require('./Routes/Login');
const User = require('./user');

dotenv.config();
const port = process.env.PORT || 8080;
const mongoURI = process.env.URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: process.env.KEYID,
  key_secret: process.env.KEYSECRET,
});

app.post('/api/payment', async (req, res) => {
  const { amount, currency, orderId } = req.body;
  console.log('Received Data:', { amount, currency, orderId });

  const options = {
    amount: amount * 100,
    currency,
    receipt: orderId,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

// Server starting
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
