const jwt = require('jsonwebtoken')


// const secretKeyAdmin = process.env.SECRET_KEY_ADMIN

const generateTokenAdmin = (user)=>{
  payload = {username : user.username}
  return jwt.sign(payload , process.env.SECRET_KEY_ADMIN , {expiresIn : '1h'})
}

const authenticateJWTAdmin = (req,res,next)=>{
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1]
    // const token  = req.cookies.token
    jwt.verify(token , process.env.SECRET_KEY_ADMIN , (err , user)=>{
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