const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


exports.salam = (req, res) => {
    res.send({message: "users module"})
}

exports.signup = (req, res) => {
    const user = new User(req.body)

    user.save((err, user) => {
        if(err) {
            return res.status(400).send(err)
        }
    user.hashed_password = undefined
    user.salt = undefined
        res.send(user)
    })
}

exports.singin = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found with this email, Please Signup!"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email ans Password dont mutch !"
            })
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);

        res.cookie("token", token, {expire: new Date() + 902600})

        const {_id, name, email, role} = user;

        res.json({
            token, user: {_id, name, email, role}
        })
    })
}


exports.signout = (req, res) => {
    res.clearCookie("token")

    res.json({
        message : "User is Signout"
    })
}

