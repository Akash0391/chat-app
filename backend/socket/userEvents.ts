import { Server as SocketIOServer, Socket } from "socket.io";

export const userEvents = (io: SocketIOServer, socket: Socket) => {
    socket.on("joinRoom", (data) => {
        socket.emit("joinedRoom", {
            message: "You have joined the room",
            roomId: data.roomId,
        });
    });
};