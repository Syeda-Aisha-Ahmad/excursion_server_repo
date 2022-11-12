const express = require('express');
var cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v0q5o0h.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const serviceCollection = client.db('excursion').collection('allservices')
        const reviewCollection = client.db('excursion').collection('reviews')

        // All services data
        app.get('/allservices', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // 3 services data
        app.get('/3services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query).limit(3);
            const users = await cursor.toArray();
            res.send(users);
        })

        // Dynamic service data
        app.get('/allservices/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const serviceDetails = await serviceCollection.findOne(query);
            res.send(serviceDetails)
        })

        //Review datas
        app.post('/allreviews', async (req, res) => {
            const review = req.body;
            const reviews = await reviewCollection.insertOne(review);
            res.send(reviews);
        })
    }
    finally { }
}
run().catch(error => (console.log(error)))



app.get('/', (req, res) => {
    res.send('Excursion!')
})

app.listen(5000, () => {
    console.log(`listening`)
})


