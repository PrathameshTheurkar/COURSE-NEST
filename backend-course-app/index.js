const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const adminRouter = require('./routes/admin.js')
const userRouter = require('./routes/user.js')
require('dotenv').config()

app.use(express.json());
app.use(cors())
app.use(cookieParser())


app.use('/admin', adminRouter)
app.use('/users', userRouter)



// Connect to MongoDB
// mongoose.connect('mongodb+srv://prathameshtheurkar037:Prathamesh%401@cluster0.s8asa1j.mongodb.net/' ,  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "course-selling-app" })
// mongoose.connect('mongodb+srv://prathameshtheurkar037:Prathamesh%401@cluster0.s8asa1j.mongodb.net/' ,  { dbName: "course-selling-app" })
mongoose.connect(process.env.MONGODB_URL ,  { dbName: process.env.DB_NAME })


app.listen(process.env.PORT, () => {
  console.log('Server is listening on port 3000');
});

