"use client";
import * as React from 'react';
import { socket } from '@/services/socketService';
import { ConnectionManager } from './components/ConnectionManager';

export default function Page() {

    const [isConnected, setIsConnected] = React.useState(socket.connected);
    const [fooEvents, setFooEvents] = React.useState([]);
    const [messages, setMessages] = React.useState<string[]>([]);
    const [code, setCode] = React.useState<string>("");

    React.useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected")
            setIsConnected(true);
        })

        socket.on("starter", (data) => {
            switch(data[0]) {
                case "message":
                    let message: string = data[1];
                    setMessages([...messages, message]);
                    break;
            }
        })

        socket.on("disconnect", () => {
            setIsConnected(false);
        })
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        }
    }, [])

    const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("submit")
        e.preventDefault();
        socket.emit("starter", ["join", code]);
    }

    return (
        <div className="w-screen h-screen">
            <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-sm shadow-sm border w-11/12 sm:w-[500px] p-4">
                    <h1 className="font-medium text-center">Enter a code</h1>
                    <form>
                        <input maxLength={4} value={code} onChange={(e) => setCode(e.target.value)} type="tel" className="text-sm text-center bg-gray-100 w-full border rounded-sm p-2 mt-2" placeholder="e.g. 2601" />
                        <button onClick={submit} disabled={code.length != 4} className="duration-300 transition-opacity disabled:opacity-50 bg-blue-500 text-white w-full rounded-sm p-2 mt-4 font-medium">Join</button>        
                    </form>
                </div>
            </div>
        </div>
    )
}