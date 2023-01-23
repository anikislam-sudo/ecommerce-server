const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.Port || 5000;
const app = express();


//middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4rkfhhl.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
try{
    const easyCartCollection = client.db("easyCart").collection("easyCartOption");
    app.get('/easyCartOption', async (req, res) => {
        const date = req.query.date;
        const query = {};
        const options = await easyCartCollection.find(query).toArray();
        res.send(options);
    });
}
finally{

}
}
run().catch(console.log)


app.get("/",(req,res)=>{
    res.send("task server is running");
})

app.listen(port,()=>{
    console.log(`task server running on ${port}`);
})