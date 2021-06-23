// import all package use in nodejs
const express = require("express")
const mongoose = require("mongoose");
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const http = require("http").createServer(app)
const io = require('socket.io')(http);

const Chat = require('./models/chatModel')

// import all routers
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const chatRouter = require('./routers/chatRouter')

// config app
const app = express();
require("dotenv").config()
app.use(express.json())
app.use(expressValidator())
app.use(cookieParser())
app.use(cors())


// data base connect
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db is connected'))
  .catch(err => console.log('not connect to the database'))


// Connection and Discoonection Socket Chat
io.on("connection", socket => {
    console.log('User connected');
    socket.on("disconnect", () => {
        console.log("User disconnect");
    })

    socket.on("message", async (chatId, message) => {
        console.log(chatId, message);
        let newMessage = await Chat.Schema.statics.addMessage(chatId, message);
        io.emit('message', newMessage);
    })
})

app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)

// run server
const port = process.env.PORT || 3000;
app.listen(port, ()  => {
    console.log(`server is running in port: ${port}`)
})

