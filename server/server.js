import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/db.js'
import blogRouter from './routes/blogRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser'


const app = express()
await connectDb()

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use('/api/blog', blogRouter);
app.use('/api/admin', adminRouter);


const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.json('Api is working');
})

app.listen(PORT, ()=>{
    console.log('server is running on port', PORT)
})