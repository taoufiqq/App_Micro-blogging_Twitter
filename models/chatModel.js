const mongoose = require('mongoose');
const User = require('./userModel')
const {ObjectId} = require('mongodb')


const chatSchema = new mongoose.Schema({
    messages: {
        type: Array,
        default: []
    },
    participants: {
        type: ObjectId,
        required: true
    }
})


chatSchema.statics.addMessage = async (chatId, message) => {
    let chat;
    const users = await User.find();

    try{
        chat = await Chat.findById(chatId);

        if(chat == null){
            console.log("Chat not found !!!!");
            return;
        }else if (!users.map(user => user._id.toString()).includes(message.user)){
            console.log("Message has invalid user !!!!");
            return;
        }

        chat.messages.push(message)
        chat.save();
        return {chat: chat._id, message: message}
    }catch (error){
        console.log(error);
    }
}


const Chat  = mongoose.model("Chat", chatSchema)

module.exports = {Schema: chatSchema, Model: Chat}