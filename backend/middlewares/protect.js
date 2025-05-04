const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({message : "User is not Authorized!"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            res.status(401).json({messgae: "Token is invalid"});
        }
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({message: error.message});
        console.log(error.message);
    }
}