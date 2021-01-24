import asyncio
import json

import aiohttp

from fpl import FPL

async def main():
    async with aiohttp.ClientSession() as session:
        fpl = FPL(session)
        players_FPL = await fpl.get_players(return_json=True)
        g = 1
        d = 1
        m = 1
        f = 1

        players_FPL[:] = [player for player in players_FPL if not player["status"] == "u"]
             
        for player in players_FPL:
            if player["element_type"] == 1:
                key = "GK" + str(g)
                player.update({key: 1})
                key = "BR"
                player.update({key: 1})
                g += 1
            elif player["element_type"] == 2:
                key = "DEF" + str(d)
                player.update({key: 1})
                key = "OBR"
                player.update({key: 1})
                d += 1
            elif player["element_type"] == 3:
                key = "MID" + str(m)
                player.update({key: 1})
                key = "POM"
                player.update({key: 1})
                m += 1
            elif player["element_type"] == 4:
                key = "FWD" + str(f)
                player.update({key: 1})
                key = "NAP"
                player.update({key: 1})
                f += 1
            player.update({"nbPlayer": 1})
        print(json.dumps(players_FPL))
                    
loop = asyncio.get_event_loop()
loop.run_until_complete(main())