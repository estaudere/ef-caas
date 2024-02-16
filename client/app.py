import asyncio
import websockets
import json


async def handler(websocket):
    async for message in websocket:
        event = await websocket.recv()
        print(event)
        if event == "ready":
            for i in range(10):
                event = {
                    "data": str(i) + " answer to life"
                }
                await websocket.send(json.dumps(event))
                await asyncio.sleep(1)


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())