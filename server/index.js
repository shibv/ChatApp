const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./Routes/userRoutes")
const messageRoutes = require("./Routes/messagesRoute")
const socket = require("socket.io");

const app = express();
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);



mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected")
}).catch((e)=> {
    console.log(e.message)
})

 const server = app.listen(process.env.PORT , () => {
    console.log("Server Started on 5000")
})

const io = socket( server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user" ,  (userId) => {
        onlineUsers.set(userId, socket.id)

        
    });
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
        
    })
})

