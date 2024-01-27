
import { socket } from '@/services/socketService';

export function ConnectionManager() {
    function connect() {
        console.log("Connecting");
        socket.connect()
    }

    function disconnect() {
        socket.disconnect()
    }

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-row gap-2">
                <button className="bg-black px-2.5 py-1.5 text-white rounded-md text-sm" onClick={connect}>Connect</button>
                <button className="bg-black px-2.5 py-1.5 text-white rounded-md text-sm" onClick={disconnect}>Disconnect</button>
            </div>
        </div>
    )
}