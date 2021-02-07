// This script is used to query the Rick and Morty api (https://rickandmortyapi.com/) in order
// to seed our database with the characters used for the name comparison 

async function seedDb() {
  const { Mongo } = require('./mongo-client');
  const axios = require('axios');

  const mongo = new Mongo('RM');
  await mongo.connect();
  try {
    let uri = 'https://rickandmortyapi.com/api/character';
    let result = await axios.get(uri);
    storeCharData(mongo, result.data.results)

    //Loop for pages 2-34
    for (let i = 2; i < 35; i++) {
      uri = `https://rickandmortyapi.com/api/character?page=${i}`;
      result = await axios.get(uri);
      storeCharData(mongo, result.data.results)
    }
  } catch (error) {
    console.error(error);
  }
}

async function storeCharData(mongo, chars) {
  const characters = mongo.db.collection('characters');
  for (let i = 0; i < chars.length; i++) {
    let char = chars[i];
    let doc = { name: char.name, url: char.url }
    console.log(`"${char.name}",`);

    // Try to insert into mongo
    try {
      let result = await characters.insertOne(doc);
    } catch (error) {
      console.error(`Failed to insert ${char.name}`);
    }

  }
}


seedDb();