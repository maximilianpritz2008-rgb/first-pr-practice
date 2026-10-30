# First PR Practice

This is a small practice repository for learning how to open a pull request on GitHub.

## What this is

A minimal repo to try out the workflow: branch, commit, push, open PR, merge.

## Klotz Kaskade (game)

`game/index.html` is a small block puzzle game: drag the three pieces onto the 8×8 board and fill complete rows or columns to clear them. It is a single HTML file with no dependencies, so open it in any browser to play.

Players earn coins for cleared lines, first wins and new stars (endless pays per 200 points) and spend them in the shop on block skins (classic, candy, neon, gems) and backgrounds. The animated canvas backgrounds are evening hills with fireflies, a beach at sunset and a winter night with aurora and snow. A rewarded ad can double a win's coins or give 50 free coins up to three times a day.

Screens: a title screen, a main menu, a level map, stats, settings, and a pause menu during play.

Modes: a daily challenge (same board for everyone each day, with a day streak), endless, and 10 levels with star ratings. In levels with bushes the goal is to clear every bush by completing its row or column; thorny bushes need two clears. Sound effects and background music are synthesised and can be toggled separately; particle effects can be toned down in the settings.

The dealer picks each hand in one of four ways: pure chance; a fair hand where all three pieces fit (always for the first three hands, more often on a crowded board); a hard hand (the worst of several samples), which gets more likely the longer a round lasts, so every round ends eventually; or, during a luck boost, the best of 25 sampled hands. Players earn a luck boost (3 hands) or rescue a lost round up to twice (clears the middle rows plus 2 lucky hands) by watching a rewarded ad, which is a placeholder for now. After 20 minutes of play the game suggests a break.

## Claude skills

`.claude/skills/` holds game development skills Claude Code loads in this repository; see `.claude/skills/README.md` for sources and licenses.

## Omas Arche (prototype)

`arche/index.html` is a prototype for a second game built on the same puzzle engine. The player inherits their grandmother's old space ark, plays block puzzle levels on alien planets to clear obstacles (bushes on Moosmond, snow and ice on Frostia), earns spare parts to repair the ark's rooms, unlocks grandma's letters in a logbook, rescues animals that move into the ark, and flies on to the next planet once the engine is fixed. Art is placeholder (emoji and CSS); progress is saved in localStorage.
