const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { isSameDay } = require('date-fns');
const Activity = require("../models/Activity");

const generateJWTToken = (id,role) => {
    const token = jwt.sign({id,role}, process.env.JWT_SECRET, {expiresIn: "7d"});
    return token;
}

exports.signup = async (req,res) => {
    const {name, email, password, adminToken, username} = req.body;
    try {
        const userExits = await User.findOne({email});
        if(userExits){
            return res.status(400).json({message: "User already Exits"});
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        let role = "user";
        if(adminToken == 123456){
            role = "admin";
        }
        console.log(username);
        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword,
            todayRewardClaimed: true,
            credits: 10,
            lastLogin: Date.now(),
            role,
        })
        await Activity.create({
            userId: user._id,
            type: "signup",
            details: "Account created.",
          });
        res.status(201).json({
            token: generateJWTToken(user._id, user.role),
        })
    } catch (error) {
        res.status(500).json({message: "Error in SignUp", error: error.message})
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatchPassword = await bcryptjs.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const now = new Date();
        const lastLogin = new Date(user.lastLogin);

        if (!isSameDay(lastLogin, now)) {
            user.credits += 10;
            user.lastLogin = now;
        }
        user.todayRewardClaimed = true;
        await user.save();

        return res.status(200).json({token: generateJWTToken(user._id, user.role)});

    } catch (error) {
        return res.status(500).json({message: "Error log in!", error: error.message});
    }
}

exports.getUserInfo = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        const now = new Date();
        const lastLogin = new Date(user.lastLogin);

        if (!isSameDay(lastLogin, now)) {
            user.credits += 10;
            user.lastLogin = now;
        }
        user.todayRewardClaimed = true;
        await user.save();
        return res.status(200).json({
            ...user.toObject(),
        })
    } catch (error) {
        return res.status(500).json({message: "Error getting user info!", error: error.message});
    }
}
exports.getUsers = async (req, res) => {
    try {
      // Check if the authenticated user is an admin
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      // Fetch all users, exclude sensitive fields like password
      const users = await User.find({}, "-password").sort({ createdAt: -1 });
  
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Failed to fetch users", error: err });
    }
};