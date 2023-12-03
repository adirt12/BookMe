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


mongoose
  .connect("mongodb+srv://adi:adi@cluster0.sazivq4.mongodb.net/BookMeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const user = require("./models/user");

app.post('/addUser', async(req, res) => {
  try {
    const {
      email,
      userName,
      firstName,
      lastName,
      password,
      dateOfBirth,
      phoneNumber,
    } = req.body;

    //create a new Employee
    const newUser = new user({
      email,
      userName,
      firstName,
      lastName,
      password,
      dateOfBirth,
      phoneNumber,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", user: newUser });
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// email,
// userName,
// firstName,
// lastName,
// password,
// dateOfBirth,
// phoneNumber,


