import asyncio
import websockets
import json

liveData = 0

async def handler(websocket):
    async for message in websocket:
        event = await websocket.recv()
        print(event)
        if event == "ready":
            for _ in range(10):
                liveData += 1
                event = {
                    "Live Data Stream: " + str(liveData) + " "
                }
                
                await websocket.send(json.dumps(event))
                await asyncio.sleep(1)
        if event == "change location":
                event = {
                    "Compute interrupted, migrated to new vehicle"
                }
                await websocket.send(json.dumps(event))
                await asyncio.sleep(1)
                websocket.send("change location")


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())