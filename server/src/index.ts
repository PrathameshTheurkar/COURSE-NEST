import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import adminRouter from './routes/admin'
import userRouter from './routes/user'
import dotenv, { config } from 'dotenv'
import path from 'path'

const app = express();
dotenv.config({
  path: path.join(__dirname, '../.env')
})
app.use(express.json());

const buildPath = path.join(__dirname, '../../client/dist')

app.use(express.static(buildPath))
app.use(cors)
app.use(cookieParser())


app.use('/admin', adminRouter)
app.use('/users', userRouter)



// Connect to MongoDB
mongoose.connect((process.env.MONGODB_URL || '')  ,  { dbName: process.env.DB_NAME || '' })

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'), (err) => {
    if(err)res.status(500).send(err)
  })
})


app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});

