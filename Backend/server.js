
const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors')
// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassHo';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())
// const db = client.db(dbName);

// To get all thw password
app.get('/', async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
// To save all the password
app.post('/', async (req, res) => {
  const password = req.body
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.json({sucess:true })
})

// To delate 
app.delete('/', async (req, res) => {
  const password = req.body
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json({sucess:true })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})