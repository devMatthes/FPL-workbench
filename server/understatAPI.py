import asyncio
import json
import datetime

import aiohttp

from understat import Understat

CURRENT_DATE = datetime.datetime.now()

async def main():
    async with aiohttp.ClientSession() as session:
        understat = Understat(session)
        players_Understat = await understat.get_league_players(
            'epl', CURRENT_DATE.year
        )

        print(json.dumps(players_Understat))
                    
loop = asyncio.get_event_loop()
loop.run_until_complete(main())