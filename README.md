# First PR Practice

This is a small practice repository for learning how to open a pull request on GitHub.

## What this is

A minimal repo to try out the workflow: branch, commit, push, open PR, merge.

## Klotz Kaskade (game)

`game/index.html` is a small block puzzle game: drag the three pieces onto the 8×8 board and fill complete rows or columns to clear them. It has a daily challenge (same board for everyone each day, with a day streak), an endless mode and 10 levels with stone blocks, line goals and star ratings. Sound effects and background music are synthesised and can be toggled separately, and particle effects respect reduced-motion settings. After 20 minutes of play it suggests a break.

The dealer picks each hand in one of three ways: pure chance; a fair hand where all three pieces fit (always for the first three hands, more often when the board is crowded); or, during a luck boost, the best of 25 sampled hands. Players earn a luck boost (3 hands) or a second chance (clears the middle rows plus 2 lucky hands) by watching a rewarded ad, which is a placeholder for now. It is a single HTML file with no dependencies, so open it in any browser to play.

## Claude skills

`.claude/skills/` holds game development skills Claude Code loads in this repository; see `.claude/skills/README.md` for sources and licenses.
