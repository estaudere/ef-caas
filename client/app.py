import asyncio
import websockets
import json

global CONNECTED
CONNECTED = False

async def handler(websocket):
    global CONNECTED
    while True:
        try:
            event = await websocket.recv()
            print(event)
            event_type = json.loads(event).get("type") or event
            if event_type == "ready" and not CONNECTED: # check to ensure at least ONE client is connected
                print("Client Connected")
                CONNECTED = True
                user_input = input("Command: ")
                event = {
                    "data":  user_input
                }
                
                await websocket.send(json.dumps(event))
            elif event_type == "ready" and CONNECTED:
                pass

            if event_type == "result":
                print(json.loads(event).get("data"))
            if event == "change location":
                pass  
        except websockets.ConnectionClosed:
            # handle moving to new thread
            print("Connection Closed")
            CONNECTED = False
            break

async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())