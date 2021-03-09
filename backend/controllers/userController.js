import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../model/userModel.js'

//@Auth user and send token 
//@route  GET /api/users/login
//@access  public 

const authUser = asyncHandler( async (req,res)=>{
    // console.log(req.body)
   const { email, password} = req.body

   const user = await User.findOne({email})
   
   if(user && (await user.matchPassword(password)))
   {
       res.json(
        {
           _id: user._id,
           name:user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id)
        })

   }else{
       res.status(401)
       throw new Error('Invalid email or password')
   }
})


export { authUser }