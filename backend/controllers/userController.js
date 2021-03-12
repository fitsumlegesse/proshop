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
   
   //does the matchPassword() convert the userinputted password to a hash and then compare it ?
   // I think, the schema.methods.mP() convert the text pw to a hash and then convert it 
   
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

//@Auth register a user 
//@route  POST /api/users
//@access  public 

const registerUser = asyncHandler( async (req,res)=>{
    
   const { name,email, password} = req.body

   const userExists = await User.findOne({email})
   
   if(userExists)
   {
       res.status(400)
       throw new Error('User already exists')
   }

   const user = await User.create(
       {
           name,
           email,
           password
       })

       if(user)
       {
           res.status(201).json
           (
               {
                _id: user._id,
                name:user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)

               }
           )}else{
               res.status(400)
               throw new Error('Invalid user data')
           }
   
})



//@Auth get user profile 
//@route  GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler( async (req,res)=>{
  
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })


    }else{
        res.status(404)
        throw new Error('User not found.')
    }
})




export { authUser, registerUser, getUserProfile }