const expressJWT = require("express-jwt")
require('dotenv').config()

exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && (req.profile._id == req.auth._id)
    
    if(!user){
        res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}


exports.isUser = (req, res, next) => {
    if(req.auth.role == "USER"){
        return res.status(403).json({
            error: "User Ressource, Access Denied"
        })
    }

    next()

     
}