import { Server } from "socket.io"

export let IO

export const SocketInit = (http) => {
   IO = new Server(http, {
      cors: {
         origin: "http://localhost:5173",
      },
   })
}
