const { createServer } = require('http')
const { Server } = require("socket.io");

let Data = {
    users: [],
}

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    },
})

io.listen(4000, () => {
    console.log("Socket server listening on port 4000");
})

io.on("connection", (socket) => {
    // @ts-ignore
    console.log("Client connected");
    socket.emit("starter", ["message", "Hello from socket server"])
    Data.users.push(socket.id)

    console.log(`There is a total of ${Data.users.length} users connected`)

    socket.on("disconnect", () => {
        console.log("client disconnected")
        Data.users = Data.users.filter((user) => user !== socket.id)
        console.log(`There is a total of ${Data.users.length} users connected`)
    })

    socket.on("starter", (data) => {
        console.log(data)
        switch(data[0]) {
            case "join":
                console.log(`${socket.id} is joining a room ${data[1]}`)
                break;
        }
    })

})