import dotenv from "dotenv";
import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { userEvents } from "./userEvents";

dotenv.config();

export function initializeSocket(server: any): SocketIOServer {
    const io = new SocketIOServer(server, {
        cors: {
            origin: '*', //allow all origins
        },
    }); 

    //middleware to authenticate the socket
    io.use((socket: Socket, next) => {
        const token = socket.handshake.query.token;
        if(!token) {
            return next(new Error("Authentication error"));
        }
        //verify the token
        jwt.verify(token as string, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if(err) {
                return next(new Error("invalid token"));
            }
            //attach user to socket data    
            let userData = decoded.user;
            socket.data = userData;
            socket.data.userId = userData.id;
            next();
        });
    })

    //when a socket connects ,register the user events

    io.on("connection", async (socket: Socket) => {
        const userId = socket.data.userId;
        console.log("A user connected", userId);

        //register the user events
        userEvents(io, socket); 

        //send welcome message
        socket.emit("welcome", "Welcome to the chat");
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });

    return io;
}