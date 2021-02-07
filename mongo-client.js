const { MongoClient } = require('mongodb');

class Mongo {
  constructor(dbName) {
    this.connectionString = "mongodb+srv://User1:manage@rm.b2kwe.mongodb.net/RM?retryWrites=true&w=majority"
    this._dbName = dbName;
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(this.connectionString, { useUnifiedTopology: true });
      console.log('Connected to Mongo Atlas');
      this.db = this.client.db(this._dbName);
    } catch (error) {
      console.error(err);
    }
  }

  async close() {
    await this.client.close();
  }

  async insertDocument(doc, collection) {
    try {
      const col = this.db.collection(collection);
      let result = await col.insertOne(doc);
      return true;
    } catch (error) {
      console.error(`Failed to insert name. ${error}`);
      return false;
    }
  }

  async searchDocument(doc, collection) {
    try {
      const col = this.db.collection(collection);
      const name = await col.findOne(doc);
      return name;
    } catch (error) {
      console.error(`Search failed. ${error}`);
    }
  }
}

module.exports = { Mongo }