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
}

module.exports = { Mongo }