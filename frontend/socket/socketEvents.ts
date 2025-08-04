import { getSocket } from "./socket"

export const testSocketEvent = ( payload: any, off: boolean = false ) => {
    const socket = getSocket();
    if(!socket) {
        console.log("Socket not connected");
        return;
    }

    if(off) {
        //turn off listening to the event
        socket.off("testSocketEvent", payload);
    } else if( typeof payload === "function" ) {
        socket.on("testSocketEvent", payload); //callback to the event
    } else {
        socket.emit("testSocketEvent", payload); //sending the payload to the server as data
    }
}

export const updateProfile = ( payload: any, off: boolean = false ) => {
    const socket = getSocket();
    if(!socket) {
        console.log("Socket not connected");
        return;
    }

    if(off) {
        //turn off listening to the event
        socket.off("updateProfile", payload);
    } else if( typeof payload === "function" ) {
        socket.on("updateProfile", payload); //callback to the event
    } else {
        socket.emit("updateProfile", payload); //sending the payload to the server as data
    }
}