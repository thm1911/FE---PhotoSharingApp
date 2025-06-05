import { io } from "socket.io-client";

export const baseUrl = "http://localhost:8080";
export const socket =  io.connect("http://localhost:3001");