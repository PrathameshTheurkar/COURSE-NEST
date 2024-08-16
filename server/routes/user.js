const express = require('express')
const mongoose = require('mongoose')
const {User, Course} = require('../db/db.js')
const {generateTokenUser, authenticateJWTUser} = require('../middleware/user.js')

const router = express.Router()

// User routes
router.post('/signup', async (req, res) => {
    // logic to sign up user
    let {username , password, firstName, lastName} = req.body;
    const existingUser =await User.findOne({username , password})
  
    if(existingUser){
      res.json({success: false, message : "User already signed up"})
    }else{
      const newUser = new User({firstName, lastName, username , password ,purchasedCourses : []})
      await newUser.save()
      token = generateTokenUser(req.body)
    
      // res.status(200).cookie("token", token, {expire : 24 * 60 * 60 * 1000}).json({message : "User created successfully" , token})
      res.status(200).json({success: true, message : "User created successfully" , token})
    }
    
  
  });
  
  router.post('/login',async (req, res) => {
    // logic to log in user
    const {username , password} = req.body;
    const user1 = await User.findOne({username, password})
    if(user1){
      token = generateTokenUser(user1)
      // res.cookie("token", token, {expire : 24 * 60 * 60 * 1000}).json({message : "Login Succesfully" , token1 : token})
      res.status(200).json({success: true, message : "Login Succesfully" , token})
    }else{
      res.status(403).json({success: false, message : 'User not found'})
    }
   
  });
  
  router.get('/courses', authenticateJWTUser, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find()
    res.json({success: true, courses: courses})
  });

  router.get('/course/:courseId', authenticateJWTUser, async(req, res)=> {
    //logic to get a single course

    const courseId = req.params.courseId

    const course = await Course.findById(courseId)
    if(course){
      res.status(200).json({success: true, msg: 'Course founded', course})
    }else{
      res.status(404).json({success: false, msg: 'Course not found'})
    }
  })
  
  router.post('/courses/:courseId', authenticateJWTUser, async (req, res) => {
    // logic to purchase a course
    const isValid = mongoose.Types.ObjectId.isValid(req.params.courseId)
    if(!isValid){
      return res.status(403).json({success: false, message: "Invalid courseId"})
    }
    const course = await Course.findById(req.params.courseId);
    if(course){
      const user = await User.findOne({username : req.user.username})
      if(user){
  
        const isPurchased = user.purchasedCourses.find(co => co._id.toString() == req.params.courseId)
  
        if(isPurchased){
          res.json({message : "Course already purchased"})
        }else{
          user.purchasedCourses.push(course);
          await user.save()
          res.json({message : "Course purchased"})
        }
  
      }else{
        res.status(403).json({message : "User doesn't exist"})
      }
    }else{
      res.status(404).json({message : "Course doesn't exist"})
    }
  });
  
  router.get('/purchasedCourses', authenticateJWTUser, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username : req.user.username}).populate('purchasedCourses')
    if(user){
      res.json({purchasedCourses : user.purchasedCourses || []})
    }else{
      res.status(403).json({message:"User not found"})
    }
  });
  

  module.exports = router