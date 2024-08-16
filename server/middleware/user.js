const jwt = require("jsonwebtoken")


// const secretKeyUser = process.env.SECRET_KEY_USER

const generateTokenUser = (user)=>{
  payload = {username : user.username}
  return jwt.sign(payload , process.env.SECRET_KEY_USER , {expiresIn : '1h'})
}

const authenticateJWTUser = (req, res, next)=>{
  const authHeader = req.headers.authorization

  if(authHeader){
    const token = authHeader.split(' ')[1]

    // const token = req.cookies.token

    jwt.verify(token , process.env.SECRET_KEY_USER , (err ,user)=>{
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


module.exports = {
    generateTokenUser,
    authenticateJWTUser
}