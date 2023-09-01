const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')
const router = require('./routers/index')
const path = require('path')
const PORT = process.env.PORT || 80

//db Connection 

db.connect();
//cors
app.use(cors());


//middlewares


app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

app.use(express.json())
//headers

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
})

//api

app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))

    } catch (e) {
        res.send('Opps!error occurred')
    }
})

//server listen

app.listen(PORT, () => {
    console.log(`StackOverflow clone is runnine on port 80`)
})

