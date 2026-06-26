import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js'
import blogRouter from './routes/blogRoutes.js'


const app = express()
await connectDb()

//middleware
app.use(cors());
app.use(express.json());
app.use('/api/blog', blogRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.json('Api is working');
})

app.listen(PORT, ()=>{
    console.log('server is running on port', PORT)
})