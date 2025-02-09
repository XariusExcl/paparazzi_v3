# Paparazzi
A small js app to take screenshots of specified urls.

## Technologies Used

- Vite
- Alpine.js
- Express
- Puppeteer
- Tailwind

## Installation (Dockerfile)

1. `docker build -t paparazzi .`

Client is on port :3000 and is reachable on the url http://localhost:3000/

Server is on port :3312 and is reachable on the url http://localhost:3312/public

## Installation (Classic)

0. Have node v18 or higher installed.

1. Clone the repository.
2. Install the dependencies by running the following command:

    ```bash
    cd paparazzi_server
    npm install
    cd ../paparazzi_v3
    npm install
    ```

## Usage

Run both the server and the frontend.
- To start the server :
    - `cd` to the server folder,
    - `node server.js`. Default port is 3312 (http://localhost:3312/public).

- To start the frontend :
    - `cd` to the frontend folder,
    - Build the files with `npm run build`,
    - Serve with `npx serve dist\` (or anything else you want).
