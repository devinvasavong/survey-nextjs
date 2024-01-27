import { io, Socket } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

let socket: Socket;

if (URL) {
    socket = io(URL, { autoConnect: false });
} else {
    console.error('Socket URL is undefined in non-production environment');
    socket = io({ autoConnect: false });
}

export { socket };