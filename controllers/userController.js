const User = require('../models/userModel')

exports.getOneUser = (req, res) => {
   
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    res.json({
        user: req.profile
    })
}

exports.updateOneUser = (req, res) => {
   User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true}, (err, user) => {

    if(err){
        return res.status(400).json({err})
    }

    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    res.json({user})
   })
}

exports.getAllUser = (req, res) => {
    User.find().exec((err, users) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        res.json({
            users
        })
    })
}