# When to Wash

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
 
A frontend React app that helps you decide the best day to wash your car based on the weather forecast for any location in the world.

## Demo

[Live demo](https://when-to-wash-iota.vercel.app/)
 
## How it works
 
1. Click anywhere on the map to select a location
2. Hit **Calculate** to fetch a 7-day forecast from Open-Meteo
3. Get a recommendation for the optimal wash day based on rain probability, wind speed, and temperature
## Tech stack
 
- React + TypeScript + Vite
- Tailwind CSS v4
- Leaflet / react-leaflet — interactive map
- [Open-Meteo](https://open-meteo.com/) — free weather API, no key required
 ## Testing

- **Vitest** — unit tests for API and scoring logic
- **Playwright** — end-to-end tests (coming soon)

```bash
npm run test       # unit tests
npm run test:e2e   # e2e tests
```

## Run locally

```bash
npm install
npm run dev
```
## Status
 
Work in progress — UI polish and scoring improvements ongoing.
 
