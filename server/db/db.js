const mongoose = require('mongoose')

// Define mongoose Schema 
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
  })
  
  const adminSchema = new mongoose.Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  })
  
  const courseSchema = new mongoose.Schema({
    title : String ,
    description : String ,
    price : Number,
    imageLink : String,
    published : Boolean
  })
  
  // Define mongoose models
  const User = mongoose.model('User' , userSchema)
  const Admin = mongoose.model('Admin' , adminSchema)
  const Course = mongoose.model('Course' , courseSchema)


  module.exports = {
    User,
    Admin,
    Course
  }