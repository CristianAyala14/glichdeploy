import express from "express";
import {engine} from "express-handlebars";
import { urlencoded } from "express";
import {Server} from "socket.io";
import __dirname from "./utils.js";
import { ViewsRouter } from "./routes/viewsRouter.js";

//variables
let messages = [];
//server
const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, ()=>{console.log(`Puerto funcionando en: ${PORT}`)}) 
//socket
const io = new Server (httpServer);
//motor de plantilla
app.engine("handlebars", engine());
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")
//middlewires
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use("/", ViewsRouter)


io.on("connection",(socket)=>{
    
    socket.on("chat-message", (data)=>{
        messages.push(data);
        io.emit("messages", messages);
    })

    socket.on("new-user", (username)=>{
        socket.emit("messages",messages )
        socket.broadcast.emit("new-user", username)
    })

})
