const express = require('express')
const mongoose = require('mongoose')
const {Admin, Course} = require("../db/db.js")
const {generateTokenAdmin, authenticateJWTAdmin} = require('../middleware/admin.js')

const router = express.Router()


// Admin routes
router.post('/signup', async (req, res) => {
    // logic to sign up admin
    let username = req.body.username;
    let password = req.body.password;
    const {firstName, lastName} = req.body
  
    admin = await Admin.findOne({username, password})
    if(admin){
      res.status(403).json({success : false,massage : 'Admin already exits'});
    }else{
      const newAdmin = new Admin({firstName, lastName, username , password})
      await newAdmin.save()
      token = generateTokenAdmin(req.body)
      res.json({ success : true, message: 'Admin created successfully'  , token : token});
    //   res.cookie("token", token, {expire : 24 * 60 * 60 * 1000 }).json({ success : true,message: 'Admin created successfully'  , token1 : token});
    }
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in admin
    let {username , password} = req.body;
    admin = await Admin.findOne({username , password})
  
    if(admin){
      token = generateTokenAdmin(admin)
      res.json({success : true, message : 'Login Successfully' , token1 : token})
    //   res.cookie("token", token, {expire : 24 * 60 * 60 * 1000 }).json({success : true, message : 'Login Successfully' , token1 : token})
    }else{
     res.json({success : false ,message : 'Admin Authentication failed'})
    }
  });
  
  router.get('/me' , authenticateJWTAdmin , (req,res)=>{
    res.json({
      auth : true,
      user : req.user  })
  })
  
  router.post('/courses', authenticateJWTAdmin , async (req, res) => {
    // logic to create a course
    let course = req.body;
    
    const newCourse = new Course(course)
      const checkCourseExist = await Course.findOne({title : newCourse.title , description : newCourse.description , price  : newCourse.price , imageLink : newCourse.imageLink , published : newCourse.published})
      if(checkCourseExist){
        res.json({success : false,message : "Course already created"})
      }else{
        await newCourse.save()
        res.json({success : true , message : "Course created successfully" , courseId : newCourse._id.toString()})
      }
  
    // }
  });
  
  router.put('/course/:courseId' , authenticateJWTAdmin,async (req, res) => {
    // logic to update a course
    const isValid = mongoose.Types.ObjectId.isValid(req.params.courseId)
    if(!isValid){
      return res.status(403).json({success: false, message: "Invalid courseId"})
    }
    const course =await Course.findByIdAndUpdate(req.params.courseId , req.body , {new : true})
    if(course){
      res.json({success: true, message : "Course Updated Successfully"});  
    }else{
      res.status(403).json({success: false, message : "Course doesn't exits"})
    }
  });
  
  router.get('/course/:courseId', authenticateJWTAdmin ,async (req,res)=>{
    // logic to get one course by courseId
    const isValid = mongoose.Types.ObjectId.isValid(req.params.courseId)
    if(!isValid){
      return res.status(403).json({success: false, message: "Invalid courseId"})
    }
  
    const course = await Course.findById(req.params.courseId)
    if (course){
      res.status(200).json({success: true, message : "Course fetched successfully", course})
    }else{
      res.status(403).json({success:false , message : "Course doesn't exits!!"})
    }
  })
  
  router.get('/courses', authenticateJWTAdmin ,async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({})
    res.json(courses);
  });

  router.delete('/course/:courseId', authenticateJWTAdmin, async(req, res)=>{
    const {courseId} = req.params
    const courseExist = await Course.findById(courseId)

    if(courseExist){
      const course = await Course.findByIdAndDelete(courseId)
      res.status(200).json({success: true, msg: 'Course Deleted Successfully', course})
    }else{
      res.json({success: false, msg: 'Course does not exist'})
    }
  })


  module.exports = router
  