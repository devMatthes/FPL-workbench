import asyncio
import json

import aiohttp

from fpl import FPL

async def main():
    async with aiohttp.ClientSession() as session:
        fpl = FPL(session)
        players = await fpl.get_players(return_json=True)

        top_performers = sorted(
            players, key=lambda x: x["total_points"], reverse=True
        )
        
        for player in top_performers[:5]:
            print(json.dumps(player))

loop = asyncio.get_event_loop()
loop.run_until_complete(main())