const express = require('express');
const bodyParser = require('body-parser')
const { Mongo } = require('./mongo-client');
const { getCloseNames } = require('./levenshtein');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = 8080;

function onStart(port) {
  console.log(`Listening on port: ${port}`)
}

function loadRoutes(app, mongo) {
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
  });

  app.post('/nameSearch', async (req, res) => {
    const result = await searchName(mongo, req.body.name);
    if (result)
      res.send(result);
    else
      res.send('Name not found');
  });

  app.post('/closeNames', (req, res) => {
    console.log(`Calculating close names for: ${req.body.name}. "Closeness" value: ${req.body.closeness}`);

    // Find names that are close
    const closeNames = getCloseNames(req.body.name, req.body.closeness);
    res.send(closeNames);
  });

  app.post('/insertName', async (req, res) => {
    let result = await insertName(mongo, req.body.name);
    if (result)
      res.send('Name inserted');
    else
      res.send('Failed to insert name');
  });
}

async function startServer(portNum) {
  const mongo = new Mongo('RM');
  try {
    let port;
    portNum ? port = portNum : port = PORT
    app.listen(port, onStart(port));
    loadRoutes(app, mongo);

  } catch (error) {
    console.error(error);
  }
}

async function insertName(mongo, name) {
  console.log(`Inserting name: ${name}`);
  try {
    // Insert name to mongo
    const doc = { name: name }
    await mongo.connect();
    return await mongo.insertDocument(doc, 'characters');

  } catch (error) {
    console.error(error);
  } finally {
    await mongo.close();
  }
}

async function searchName(mongo, name) {
  try {
    console.log(`Searching db for: ${name}`);
    // Search database for matching names
    await mongo.connect();
    const doc = { name: name }
    return await mongo.searchDocument(doc, 'characters');
  } catch (error) {
    console.error(error);
  } finally {
    await mongo.close();
  }
}


startServer(process.argv[2]);