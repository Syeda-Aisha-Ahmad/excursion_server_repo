const express = require('express');
var cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://user:8QAf48dwELaa0LqM@cluster0.v0q5o0h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const serviceCollection = client.db('excursion').collection('allservices')
        console.log(serviceCollection.find({}).toArray());
        app.get('/allservices', async (req, res) => {
            const query = {};
            const cursor = await serviceCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
    }
    finally { }
}
run().catch(error => (console.log(error)))



app.get('/', (req, res) => {
    res.send('HMAS-food server!')
})

app.listen(5000, () => {
    console.log(`HMAS-food-server listening`)
})


