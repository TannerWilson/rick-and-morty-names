const express = require('express');
const bodyParser = require('body-parser')
const { Mongo } = require('./mongo-client');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = 8080;

function onStart(port) {
  console.log(`Listening on port: ${port}`)
}

function loadRoutes(app) {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  });
  app.post('/name', (req, res) => {
    console.log(`Got name: ${req.body.name}`)
  });
}

async function startServer() {

  const mongo = new Mongo('RM');

  try {
    app.listen(PORT, onStart(PORT));
    loadRoutes(app);

    // Connect to Mongo
    await mongo.connect();
    // const testCollection = mongo.db.collection('test');
    // const doc = { name: "This is a test", size: "50" };
    // const result = await testCollection.insertOne(doc);
    // console.log(`Inserted document.\n ${result}`);

  } catch (error) {
    console.error(error);
  } finally {
    await mongo.close();
  }








}

startServer();