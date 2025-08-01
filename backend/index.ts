import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import { initializeSocket } from "./socket/socket";

dotenv.config();

const app = express();
const server = http.createServer(app);

//listen to the socket events
initializeSocket(server);

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(err);
});