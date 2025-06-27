import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'


const createToken=(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//login user
 const loginUser = async(req, res) => {
 const { email, password } = req.body;
try{
  // Check if user already exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User doesnt exists" });
  }

  const isMatch= await bcrypt.compare(password,user.password)
  if (!isMatch) {
    return res.json({ success: false, message: "Invalid Credentials" });
 }
 const token =createToken(user._id);
     res.json({ success: true, token })
    }
        catch(error)
        {
            console.log({success:false,message:"Error"});
        }
}
// register user 
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
try{
  // Check if user already exists
  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.json({ success: false, message: "User already exists" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Please enter a valid email" });
  }

  // Validate password strength
  if (password.length < 8) {
    return res.json({ success: false, message: "Please enter a stronger password" });
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save user
  const user = new userModel({
    name,
    email,
    password: hashedPassword,
    cartData: {}, // default as defined in schema
  });

  await user.save();
  const token =createToken(user._id)
     res.json({ success: true, token });
    }
        catch(error)
        {
            console.log({success:false,message:"Error"});
        }
};

export { registerUser,loginUser };
