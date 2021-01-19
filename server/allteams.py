import asyncio
import json

import aiohttp

from fpl import FPL

async def main():
    async with aiohttp.ClientSession() as session:
        fpl = FPL(session)
        teams = await fpl.get_teams(return_json=True)
        i = 1

        for team in teams:
            team_fixes = await fpl.get_team(i)
            team_fixes = await team_fixes.get_fixtures(return_json=True)
            team_fixes_diff = 0
            for fix in team_fixes[:3]:
                team_fixes_diff += fix["difficulty"]
            team["fixes"] = team_fixes_diff
            i += 1
            print(json.dumps(team))


loop = asyncio.get_event_loop()
loop.run_until_complete(main())