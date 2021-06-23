const User = require('./../models/userModel')
const Chat = require('./../models/chatModel').Model


exports.getAllChat = async (req, res) => {
    const chat = await Chat.find().exec((error, chat) => {
        if(error) {
            return res.status(404).json({
                error: "Chat is not Found !!!"
            })
        }
        
        res.json({
            chat
        })
    })
}


exports.getChatById = (req, res, next, id) => {
    Chat.findById(id).exec((error, chat) => {
        if(error || !chat) {
            return res.status(404).json({
                error: "Chat is not Found !!!"
            })
        }

        req.chat = chat;
        next()
    })
}


exports.createChat = async (req, res) => {

    const {message, participants} = req.body

    const users = await User.find();

    if(message && message.some(message => !users.map(user => user._id.toString()).includes(message.user))){
        return res.status(400).json({
            error : "Message has invalid user"
        })
    }


    if(!participants || participants.length < 2){
        return res.status(400).json({
            error :"At last two participants needed for conversation"
        })
    }else if (participants.some(participant => !users.map(user => user._id.toString()).includes(participant))){
        return res.status(400).json({
            error: "A participant is not invalid"
        })
    }else if (participants.some(participant => participants.filter(x => x === participant).length > 1)) {
        return res.status(400).json({
            error : "Duplicate particiapants not allowed"
        })
    }

    const payload  = {message: message || [], participants}

    Chat.save(payload).then(result => {
        return res.json(result.ops[0])
    }).catch(err => {
        return res.status(500).json({
            error: err.message
        })
    })


}