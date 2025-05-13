const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("user server is running");
});

const users = [
  {
    name: "Aisha Rahman",
    age: 28,
    occupation: "Software Engineer",
    location: "Dhaka, Bangladesh",
    hobbies: ["Painting", "Coding"],
  },
  {
    name: "Ethan Carter",
    age: 35,
    occupation: "Photographer",
    location: "London, UK",
    hobbies: ["Hiking", "Travel"],
  },
  {
    name: "Priya Sharma",
    age: 22,
    occupation: "Student",
    location: "Mumbai, India",
    hobbies: ["Reading", "Gaming"],
  },
  {
    name: "Carlos Martinez",
    age: 41,
    occupation: "Chef",
    location: "Mexico City, Mexico",
    hobbies: ["Cooking", "Music"],
  },
  {
    name: "Mei Tanaka",
    age: 30,
    occupation: "Architect",
    location: "Tokyo, Japan",
    hobbies: ["Sketching", "Yoga"],
  },
];

app.get("/users", (req, res) => {
  res.send(users);
});
app.post("/users", (req, res) => {
  console.log("user post method");
  console.log(req.body);
  const user = req.body;
  users.push(user);
  res.send(user);
});

app.listen(port, () => {
  console.log(`user server running on port ${port}`);
});
