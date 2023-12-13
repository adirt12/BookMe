const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;


const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

app.use(express.json());
app.use(cors()); // Allow all origins (for testing purposes)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://adi:adi@cluster0.sazivq4.mongodb.net/BookMeDB";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


app.post('/getUserByEmail', async (req, res) => {

  // console.log(req.body);
  connectToMongoDB();

  const db = client.db();
  const collection = db.collection('users');
  console.log(`email inside is - ${req.body['email']}`)
  const email = req.body['email'];

  const user = await collection.findOne({ email });

  try {
    res.json(user);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/addUser', async(req, res) => {
  
  connectToMongoDB();

  const db = client.db();
  const collection = db.collection('users');
  const newUser = req.body; // Assuming the request body contains the new user data
  console.log(newUser);

  const result = await collection.insertOne(newUser);
  res.json({ message: 'User created successfully'});

});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


