import asyncio
import json

import aiohttp

from fpl import FPL

async def main():
    async with aiohttp.ClientSession() as session:
        fpl = FPL(session)
        players_FPL = await fpl.get_players(return_json=True)

        print(json.dumps(players_FPL))
                    
loop = asyncio.get_event_loop()
loop.run_until_complete(main())