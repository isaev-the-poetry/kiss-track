require("dotenv").config();
// deps inversion
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URI);

async function SaveEvents(Events) {
  const database = client.db("data");
  const tracks = database.collection("tracks");
  const data = Events.map((e) => ({ ...e, ts: new Date(e.ts) }));
  return tracks.insertMany(data);
}
module.exports = SaveEvents;
