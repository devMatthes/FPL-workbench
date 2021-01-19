import asyncio
import json

import aiohttp

from fpl import FPL

async def main():
    async with aiohttp.ClientSession() as session:
        fpl = FPL(session)
        gameweeks = await fpl.get_gameweeks(return_json=True)

        for gameweek in gameweeks:
            if (gameweek["is_current"]):
                print(json.dumps(gameweek["id"]))
                    
loop = asyncio.get_event_loop()
loop.run_until_complete(main())