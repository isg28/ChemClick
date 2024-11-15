const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require('cors');
app.use(cors());  // This will allow requests from your React app
// MongoDB connection URI
const uri = "mongodb+srv://ChemClicks:xprVfEaoxMAidRe2@cluster0.hjo3g.mongodb.net?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri);

// Serve static files (optional, if you are serving React files from Express)
app.use(express.static("public"));

// API route to fetch user data
app.get("/api/users", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("ChemClicks");
    const coll = db.collection("user");

    // Fetch user data from MongoDB
    const users = await coll.find().toArray();

    // Send the data as a JSON response
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error retrieving data");
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
