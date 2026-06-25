import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js'

const app = express()
await connectDb()

//middleware
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send('Api is working');
})

app.listen(PORT, ()=>{
    console.log('server is running on port', PORT)
})