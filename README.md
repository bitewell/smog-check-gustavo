# smog-check

_A small full-stack take-home: build a mini UV Index Monitor._

Thanks for taking the time. This is a small full-stack build. Plan on about **60 minutes**, on your own machine, with the tools you already use.

**Please use AI.** We build with Claude, Cursor, and Copilot every day, and we want you to as well. This isn't a test of whether you can write code from memory. It's a test of whether you can point an AI at a real problem and tell good output from bad.

## The idea

You're building a small UV Index Monitor. A backend serves UV readings from monitoring stations, and a mobile app shows them to the user. We've given you a running skeleton of both. Your job is to turn it into a working feature.

(This isn't our product. It's a stand-in that uses the same skills: consuming an API, turning a raw number into something a person understands, and dealing with messy real-world data.)

## What's in the box

Everything runs out of the box (see "Running it" below):

- `server/`: a small Node + TypeScript API. `GET /health` works. `GET /api/stations` is stubbed and returns a 501. Station data lives in `server/data/stations.json`.
- `app/`: an Expo / React Native app that opens to a placeholder screen.
- `app/src/lib/uv.ts`: a stubbed `uvCategory()` function with a test next to it.

## What we'd like you to build

### Core (start here)

1. Backend: make `GET /api/stations` return the stations as a clean, typed list.
2. Implement `uvCategory(uv)` so its tests pass. It maps a UV Index number to a category using the standard WHO UV Index bands:

   | UV Index | Category | Color |
   |----------|----------|-------|
   | 0-2 | Low | green |
   | 3-5 | Moderate | yellow |
   | 6-7 | High | orange |
   | 8-10 | Very High | red |
   | 11+ | Extreme | purple |

3. Frontend: fetch the stations and show them in a list. Each row has the station name, its region, and its current UV Index shown with the category and color from step 2. Handle the states a real screen has: loading, error, and empty.
4. The data is realistic, which means it isn't perfectly clean. Don't let a missing or odd value crash the screen or show something nonsensical.

### Stretch (in order, only if you have time)

You are not expected to get through all of this. A polished core beats a half-built everything. Go in order, and stop when your time is up.

- **A.** Search the list by station name.
- **B.** Tap a station to see a detail screen with its recent readings (`GET /api/stations/:id`).
- **C.** Let the user favorite stations, and have favorites survive an app restart.
- **D.** Pull-to-refresh, or auto-refresh the readings.
- **E.** Whatever you think matters most: more tests, accessibility, performance.

## Running it

**Prerequisites:** Node (see `.nvmrc`) and the free **Expo Go** app on your phone
(App Store or Google Play), which is how you'll run the app on a device.

Start both halves, in two terminals:

```bash
cd server && npm install && npm run dev   # the API, on http://localhost:4000
cd app && npm install && npm start        # the app
```

The app calls the API, so keep the server running. Then scan the QR code printed
in the `app` terminal with Expo Go to open the app on your phone.

(No device handy? Press `w` in the same terminal to open it in a browser instead.)

You don't need a Mac or a native build. Run the tests with `cd app && npm test`.

## Using AI, and what to send us

Use Claude or whatever you like. We'd rather see how you work than watch you avoid it. **Commit your AI transcript** as `claude-transcript.md`. It's honestly the most useful thing we'll look at, because it shows how you think.

Work on a branch, commit as you go, and open a pull request into `main` when you're done. Include:

1. your code,
2. `claude-transcript.md`,
3. a filled-in `SUBMISSION.md` (template is in the repo): a few lines on what you built, what you skipped, and why.

## What we care about

No surprises:

- The core works, including the messy and error cases, not just the happy path.
- You directed the AI well, and caught the things it got wrong.
- The code is clear: sensible types, readable, easy to follow.
- You spent the hour on the right things.

We are not scoring you on finishing everything. Have fun with it.
