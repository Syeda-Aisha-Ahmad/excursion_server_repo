const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v0q5o0h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('excursion').collection('allservices');

        app.get('/allservices', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const allServices = await cursor.toArray();
            res.send(allServices)
        })
    }
    finally { }
}
run().catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send('Running Port')
})

app.listen(port, () => {
    console.log(port)
})