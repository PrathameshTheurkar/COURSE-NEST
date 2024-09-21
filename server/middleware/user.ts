import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken"

// const secretKeyUser = process.env.SECRET_KEY_USER
interface User{
  username: string
}

export const generateTokenUser = (user: User)=>{
  const secretKeyUser = process.env.SECRET_KEY_USER
  if(!secretKeyUser){
    throw new Error('Secret key not found')
  }

  const payload = {username : user.username}
  return jwt.sign(payload , secretKeyUser, {expiresIn : '1h'})
}

export const authenticateJWTUser = (req: Request, res: Response, next: NextFunction)=>{
  const secretKeyUser = process.env.SECRET_KEY_USER
  if(!secretKeyUser){
    throw new Error('Secret key not found')
  }

  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1]

    // const token = req.cookies.token

    jwt.verify(token, secretKeyUser, (err ,user)=>{
      if(err){
        return res.sendStatus(403)
      }
      if(!user){ 
        return res.sendStatus(403)
      }
      if(typeof user === 'string'){
        return res.sendStatus(403)
      }

      req.headers['user'] = user.username;
      next()
    })
  }else{
    res.sendStatus(401)
  }
}
