const jwt = require('jsonwebtoken')


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


module.exports = {
    generateTokenAdmin,
    authenticateJWTAdmin
}