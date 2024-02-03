const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./user');
const registerRoute = require('./Routes/Register'); 
const loginRoute=require('./Routes/Login');

dotenv.config();
const port = 8080;
const mongoURI = process.env.URI; 

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
app.use('/api/login',loginRoute);

// Server starting
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
