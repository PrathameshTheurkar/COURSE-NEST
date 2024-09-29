import express, {Request, Response} from 'express'
import mongoose from 'mongoose'
import {Admin, Course} from "../db/db"
import {generateTokenAdmin, authenticateJWTAdmin} from '../middleware/admin'
import {z} from 'zod'

const router = express.Router()

interface AuthenticatedRequest extends Request {
  user?: {
    username: string
  }
}

const newUserSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(20),
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20)
})

const userSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(20),
})

// Admin routes
router.post('/signup', async (req: Request, res: Response) => {
    // logic to sign up admin

    const parsedInput = newUserSchema.safeParse(req.body)
    if(!parsedInput.success){
      return res.status(411).json({
        msg: parsedInput.error
      })
    }
    const {username, password, firstName, lastName} = parsedInput.data

    const admin = await Admin.findOne({username, password})
    if(admin){
      res.status(403).json({success : false,massage : 'Admin already exits'});
    }else{
      const newAdmin = new Admin({firstName, lastName, username , password})
      await newAdmin.save()
      const token = generateTokenAdmin(req.body)
      res.json({ success : true, message: 'Admin created successfully'  , token : token});
    //   res.cookie("token", token, {expire : 24 * 60 * 60 * 1000 }).json({ success : true,message: 'Admin created successfully'  , token1 : token});
    }
  });
  
  router.post('/login', async (req: Request, res: Response) => {
    // logic to log in admin
    const parsedInput = userSchema.safeParse(req.body)
    if(!parsedInput.success){
      return res.status(411).json({
        msg: parsedInput.error
      })
    }
    const {username, password} = parsedInput.data

    const admin = await Admin.findOne({username , password})
  
    if(admin){
      const token = generateTokenAdmin(admin)
      res.json({success : true, message : 'Login Successfully' , token1 : token})
    //   res.cookie("token", token, {expire : 24 * 60 * 60 * 1000 }).json({success : true, message : 'Login Successfully' , token1 : token})
    }else{
     res.json({success : false ,message : 'Admin Authentication failed'})
    }
  });
  
  router.get('/me' , authenticateJWTAdmin , (req: AuthenticatedRequest, res: Response)=>{
    res.json({
      auth : true,
      user : req.headers.user  })
  })
  
  router.post('/courses', authenticateJWTAdmin , async (req: Request, res: Response) => {
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
  
  router.put('/course/:courseId' , authenticateJWTAdmin,async (req: Request, res: Response) => {
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
  
  router.get('/course/:courseId', authenticateJWTAdmin ,async (req: Request, res: Response)=>{
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
  
  router.get('/courses', authenticateJWTAdmin ,async (req: Request, res: Response) => {
    // logic to get all courses
    const courses = await Course.find({})
    res.json(courses);
  });

  router.delete('/course/:courseId', authenticateJWTAdmin, async(req: Request, res: Response)=>{
    const {courseId} = req.params
    const courseExist = await Course.findById(courseId)

    if(courseExist){
      const course = await Course.findByIdAndDelete(courseId)
      res.status(200).json({success: true, msg: 'Course Deleted Successfully', course})
    }else{
      res.json({success: false, msg: 'Course does not exist'})
    }
  })


export default router