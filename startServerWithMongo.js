let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('CricketPlayers');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('indexMongo.html');
});

app.get('/api/cricket-players', (req,res) => {
    getAllCricketPlayers((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all cricket players successful'});
        }
    });
});

app.post('/api/cricket-player', (req,res)=>{
    let cricketPlayer = req.body;
    postCricketPlayer(cricketPlayer, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postCricketPlayer(cricketPlayer,callback) {
    collection.insertOne(cricketPlayer,callback);
}

function getAllCricketPlayers(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});