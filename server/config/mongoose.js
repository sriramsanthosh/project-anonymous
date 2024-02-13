
const mongoose = require('mongoose');
// const localuri = "mongodb://127.0.0.1:27017/sdeassignment";
const uri = "mongodb+srv://anonymous:anoymous@cluster0.zvxkfip.mongodb.net/?retryWrites=true&w=majority";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(localuri);
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// const db = mongoose.connection;


// // (up and running) then print the message 
// db.once('open', function(){
//     console.log("Connected to database :: MongoDB");
// });