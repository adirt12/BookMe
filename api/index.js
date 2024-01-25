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

app.post('/addUser', async (req, res) => {

  connectToMongoDB();

  const db = client.db();
  const collection = db.collection('users');
  const newUser = req.body; // Assuming the request body contains the new user data
  console.log(newUser);

  const result = await collection.insertOne(newUser);
  res.json({ message: 'User created successfully' });

});

app.post('/addExType', async (req, res) => {

  connectToMongoDB();
  try {
    const db = client.db();
    const collection = db.collection('ExperimentsType');
    // const newExType =new newEx({NameTypeEx}); // Assuming the request body contains the new user data
    const newExType = req.body;
    console.log(newExType.NameTypeEx);

    // await collection.createIndex({Name:newExType.NameTypeEx})
    const result = await collection.insertOne({Name:newExType.NameTypeEx});
    res.json({ message: 'ExType created successfully' });
  } catch (error) {
    console.log("We have error");
    res.json({ message: 'Error!!' });
  }
});

app.get('/getExData', async (req, res) => {

  await connectToMongoDB();

  const db = client.db();
  const collection = db.collection('ExperimentsType');

  const exData = await collection.find().toArray();

  try {
    console.log(exData)
    res.json(exData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.delete('/deleteItem', async (req, res) => {

  connectToMongoDB();

  const db = client.db();
  const collection = db.collection('ExperimentsType');
  console.log(`ExType inside is - ${req.body['Name']}`)
  // console.log(req.body)
  const Name = req.body['Name'];

  const user = await collection.deleteOne({Name});
  res.json(Name);
});


app.post('/addBooking',async(req,res)=>{

  await connectToMongoDB();
  try {
    const newBooking=req.body;

    const db = client.db();
    const collection = db.collection('Booking');
    const user = await collection.insertOne(newBooking);

    // Respond with success message and saved data
    res.json({ message: 'Booking added successfully' });
  } catch (error) {
    // Handle errors and respond with an appropriate error message
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/getBookingData',async(req,res)=>{
  await connectToMongoDB();
try{
  const db = client.db();
  const collection = db.collection('Booking');

  const data=req.body['selectedDate'];
  const ex = req.body['exName'];

  const timeData=await collection.find({date:data,bookingSubType:ex}).toArray()

  
  const taken_hours = timeData.map((book)=>{return book.time})



  res.json({ message: taken_hours });
}catch{
  res.json({ message: 'Error!!' });
}

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


