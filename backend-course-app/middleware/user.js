const jwt = require("jsonwebtoken")


const secretKeyUser = "superS3cr3t2"

const generateTokenUser = (user)=>{
  payload = {username : user.username}
  return jwt.sign(payload , secretKeyUser , {expiresIn : '1h'})
}

const authenticateJWTUser = (req,res,next)=>{
//   const authHeader = req.headers.authorization

//   if(authHeader){
//     const token = authHeader.split(' ')[1]

    const token = req.cookies.token

    jwt.verify(token , secretKeyUser , (err ,user)=>{
      if(err){
        res.sendStatus(403)
      }

      req.user = user;
      next()
    })
//   }else{
//     res.sendStatus(401)
//   }

}


module.exports = {
    generateTokenUser,
    authenticateJWTUser
}