import express from 'express';
import router from './routes.js';
import cors from 'cors'
import bodyParser from "body-parser";

const app = express()
const port = 8080
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
