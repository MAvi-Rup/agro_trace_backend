const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.slnidz9.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@agrotracecluster.ulhzboe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const farmersCollection = client.db('agro_trace').collection('all_farmers');
  
    
    //get all Products
    app.get('/all-user', async (req, res) => {
      const tools = await farmersCollection.find().toArray();
      res.send(tools);
    });
    

    app.post('/add-farmers', async (req, res) => {
      const farmers = req.body;
      const result = await farmersCollection.insertOne(farmers);
      res.send(result);
    });



    app.delete('/delete-farmer/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await farmersCollection.deleteOne(query);
      res.send(result);
    });
    
    
    

  }
  finally {

  }
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello From my Agro Trace')
})

app.listen(port, () => {
  console.log(`Agro Trace website listening on port ${port}`)
})