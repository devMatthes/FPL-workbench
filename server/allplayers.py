import asyncio
import json
import datetime
import unidecode

import aiohttp

from fpl import FPL
from understat import Understat
from unidecode import unidecode

CURRENT_DATE = datetime.datetime.now()

async def main():
    async with aiohttp.ClientSession() as session:
        fpl = FPL(session)
        understat = Understat(session)
        players_FPL = await fpl.get_players(return_json=True)

        # for player in top_performers:
            # player_name = json.dumps(player["first_name"] + " " + player["second_name"])
            # first_name, *middle_name, last_name = player_name.split()
            # player_first_name = first_name.lstrip('\"')
            # player_last_name = last_name.rstrip('\"')
            # players_Understat = await understat.get_league_players(
            #     "epl", CURRENT_DATE.year,
            # )
            
            # for player_Understat in players_Understat:
            #     if player_first_name in player_Understat["player_name"] and (player_last_name.encode('utf-8').decode('unicode-escape') in player_Understat["player_name"] or player_last_name in player_Understat["player_name"]):
            #         if player["element_type"] == 4:
            #             player["xG"] = player_Understat["xG"]
            #             player["xA"] = player_Understat["xA"]
                    
            #         elif player["element_type"] == 3:
            #             player["xG"] = player_Understat["xG"]
            #             player["xA"] = player_Understat["xA"]
                    
            #         elif player["element_type"] == 2:
            #             player["xG"] = player_Understat["xG"]
            #             player["xA"] = player_Understat["xA"]

        print(json.dumps(players_FPL))
                    
loop = asyncio.get_event_loop()
loop.run_until_complete(main())