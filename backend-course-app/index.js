const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const app = express();

app.use(express.json());


// Define mongoose Schema 
const userSchema = new mongoose.Schema({
  username : String,
  password : String ,
  purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
})

const adminSchema = new mongoose.Schema({
  username : String,
  password : String
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

const secretKeyAdmin = "superSc3r3t1"

const generateTokenAdmin = (user)=>{
  payload = {username : user.username}
  return jwt.sign(payload , secretKeyAdmin , {expiresIn : '1h'})
}

const authenticateJWTAdmin = (req,res,next)=>{
  const authHeader = req.headers.authorization
  // console.log(authHeader)
  if(authHeader){
    const token = authHeader.split(' ')[1]
    // console.log(token)
    jwt.verify(token , secretKeyAdmin , (err , user)=>{
      if(err){
        return res.sendStatus(403);
      }

      req.user = user
      next()
    })
  }else{
    res.sendStatus(401);
  } 
}

const secretKeyUser = "superS3cr3t2"

const generateTokenUser = (user)=>{
  payload = {username : user.username}
  return jwt.sign(payload , secretKeyUser , {expiresIn : '1h'})
}

const authenticateJWTUser = (req,res,next)=>{
  const authHeader = req.headers.authorization

  if(authHeader){
    const token = authHeader.split(' ')[1]

    jwt.verify(token , secretKeyUser , (err ,user)=>{
      if(err){
        res.sendStatus(403)
      }

      req.user = user;
      next()
    })
  }else{
    res.sendStatus(401)
  }

}

// Connect to MongoDB
mongoose.connect('mongodb+srv://prathameshtheurkar037:Prathamesh%401@cluster0.s8asa1j.mongodb.net/' ,  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "course-selling-app" })

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  let username = req.body.username;
  let password = req.body.password;

  admin = await Admin.findOne({username, password})
  if(admin){
    res.status(403).json({massage : 'Admin already exits'});
  }else{
    const newAdmin = new Admin({username , password})
    await newAdmin.save()
    token = generateTokenAdmin(req.body)
    res.json({ message: 'Admin created successfully'  , token1 : token});
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  let {username , password} = req.headers;
  admin = await Admin.findOne({username , password})

  if(admin){
    token = generateTokenAdmin(admin)
    res.json({message : 'Login Successfully' , token1 : token})
  }else{
   res.status(403).json('Admin Authentication failed')
  }
});

app.post('/admin/courses', authenticateJWTAdmin , async (req, res) => {
  // logic to create a course
  // console.log(req.user.username)
  let course = req.body;
  // title = course.title
  // description = course.description

  // let checkCourse =await Course.findOne({title , description})
  
  // if(checkCourse){
  //   res.json({message : "Course already exists"})
  // }else{
    // COURSES.push(course)
    const newCourse = new Course(course)
    const checkCourseExist = await Course.findOne({title : newCourse.title , description : newCourse.description , price  : newCourse.price , imageLink : newCourse.imageLink , published : newCourse.published})
    if(checkCourseExist){
      res.json({message : "Course already created"})
    }else{
      await newCourse.save()
      res.json({message : "Course created successfully" , courseId : course._id.toString()})
    }

  // }
});

app.put('/admin/courses/:courseId' , authenticateJWTAdmin,async (req, res) => {
  // logic to edit a course
  const course =await Course.findByIdAndUpdate(req.params.courseId , req.body , {new : true})
  if(course){
    res.json({message : "Course Updated Successfully"});  
  }else{
    res.status(403).json({message : "Course doesn't exits"})
  }
});

app.get('/admin/courses', authenticateJWTAdmin ,async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({})
  res.json(courses);
});



// // User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  let {username , password} = req.body;
  const existingUser =await User.findOne({username , password})

  if(existingUser){
    res.json({message : "User already signed up"})
  }else{
    const newUser = new User({username , password ,purchasedCourses : []})
    await newUser.save()
    token = generateTokenUser(req.body)
  
    res.status(200).json({message : "User created successfully" , token1 : token})
  }
  

});

app.post('/users/login',async (req, res) => {
  // logic to log in user
  // res.json({message : "Login Succesfully" , users : USERS})
  const {username , password} = req.headers;
  const user1 = await User.findOne({username, password})
  if(user1){
    token = generateTokenUser(user1)
    res.json({message : "Login Succesfully" , token1 : token})
  }else{
    res.status(403).json({message : 'User not found'})
  }
 
});

app.get('/users/courses',authenticateJWTUser,async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published : true})
  res.json({courses})
});

app.post('/users/courses/:courseId', authenticateJWTUser,async (req, res) => {
  // logic to purchase a course
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

app.get('/users/purchasedCourses',authenticateJWTUser, async (req, res) => {
  // logic to view purchased courses
  
  const user = await User.findOne({username : req.user.username}).populate('purchasedCourses')
  if(user){
    res.json({purchasedCourses : user.purchasedCourses || []})
  }else{
    res.status(403).json({message:"User not found"})
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

