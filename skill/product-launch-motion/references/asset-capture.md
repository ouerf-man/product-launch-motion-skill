# Product visuals

## A. Claude in Chrome (preferred)
1. Load the Chrome tools (`mcp__claude-in-chrome__*`) and open the product URL in a new tab.
2. **Login page?** Ask the user to sign in themselves in that tab (Google / SSO / email). Never type credentials.
   - If the user's logged-in Chrome profile isn't the connected one, ask them to connect the extension in that profile.
3. **Read-only:** navigate, open tabs and drawers, scroll, read text. Never click save, delete, submit, send or run, and never change settings.
4. For each screen the chosen type needs, record:
   - the layout (regions, cards, tables)
   - exact labels and microcopy
   - colors and fonts (inspect computed styles via JS if needed)
   - icons
   - the states (empty / filled / success / error)
   - the interaction flow
5. Note any real customer data you see, and **never reproduce it**. Rebuild screens in HTML with fictional names and numbers.
6. Mobile app: use the iOS Simulator if a build exists; otherwise fall back to the shot list.

## B. Shot list (no access)
Ask for PNG screenshots at 2× (or a short screen recording). Every request specifies:
- the screen
- the state
- light or dark mode
- clean demo data with no real customers
- the window width (1440 px for desktop)

| Type | Shots to request |
|---|---|
| T01 Teaser | 3–6 close crops of distinctive UI details (icons, a hero component, a signature interaction) |
| T02 Kinetic | optional: 1–2 hero screens for flashes |
| T03 UI hero | the main view (filled) · the key action before / during / after · the result view · a list or overview with many items |
| T04 Feature drop | the feature's screen before the action, mid-action (menu open), after (result) |
| T05 Roundup | per feature: 1 screen showing the feature in use |
| T06 Before/After | the "old way" (the competitor-free generic tool, spreadsheet, manual steps; can be recreated) · the new feature's result |
| T07 Problem → Solution | 3 screens for the solution beats (create, act, outcome) |
| T08 Use-case | per role: the input (prompt / form) + the output |
| T09 Integration | the trigger in product A · the result in product B · the settings / connect screen |
| T10 Milestone | none (numbers + logo); optional dashboard screen |
| S Launch week | per day: 1 screen of that day's feature |
