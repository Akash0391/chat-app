import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "@/constants/index";

let socket: Socket | null = null;

export async function connectSocket(): Promise<Socket> {
    const token = await AsyncStorage.getItem("token");
    if(!token) {
        throw new Error("No token found");
    }

    if(!socket) {
        socket = io(BASE_URL, {
            auth: {token},
        });

        //wait for the socket to connect
        await new Promise((resolve) => {    
            socket?.on("connect", () => {
                console.log("Socket connected", socket?.id);    
                resolve(true);  
            });
        }); 

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            socket = null;
        }); 
    }

    return socket;
}

export function getSocket(): Socket | null {
    return socket;
}

export function disconnectSocket(): void {
    if(socket) {
        socket.disconnect();
        socket = null;
    }
}