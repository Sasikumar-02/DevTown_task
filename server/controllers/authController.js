import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from './../helpers/autoHelper.js';
import JWT  from "jsonwebtoken";
export const registerController = async(req,res)=>{
    try{
        const {name, email, password, phone, address, answer }= req.body;
        //validations
        if(!name){
            return res.send({error: "Name is required"});
        }
        if(!email){
            return res.send({error: "Email is required"});
        }
        if(!password){
            return res.send({error: "Password is required"});
        }
        if(!phone){
            return res.send({error: "Phone is required"});
        }
        if(!address){
            return res.send({error: "Address is required"});
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //check user
        const existingUser = await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "Already Registered Please login",
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({name, email, phone, address, password:hashedPassword, answer}).save();
        res.status(201).send({
            success: true,
            message:"User Register Successfully",
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        })
    }
}

export const loginController =async(req, res)=>{
    try{
        const {email, password}= req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message:"Email is not registered",
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message:"Invalid Password",
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name: user.name,
                email:user.email,
                phone: user.phone,
                address:user.address,
                role: user.role,
            },
            token,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error,
        })
    }

}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        const errors = [];

        if (!email) {
            errors.push("Email is required");
        }

        if (!answer) {
            errors.push("Answer is required");
        }

        if (!newPassword) {
            errors.push("New Password is required");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: errors
            });
        }

        // Rest of your code...

        //check
        const user = await userModel.findOne({email, answer})
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success: true,
            message:"Password Reset Successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
};

export const testController = (req, res)=>{
    //console.log("protected route");
    try{
        res.send("Protected Routes"); 
    }catch(error){
        console.log(error);
        res.send({error});
    }
    
}

//update profile
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };

  //orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };