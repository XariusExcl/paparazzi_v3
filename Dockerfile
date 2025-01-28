FROM node:18

WORKDIR /app

# Install puppeteer dependencies
RUN apt-get update && apt-get install -y wget gnupg ca-certificates
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get update
RUN apt-get install -y google-chrome-stable

# Server
WORKDIR /app/paparazzi_server
COPY paparazzi_server/package.json paparazzi_server/package-lock.json ./ 
RUN npm ci
RUN npx puppeteer browsers install chrome
COPY paparazzi_server/ .

# Frontend
WORKDIR /app/paparazzi_v3
COPY paparazzi_v3/package.json paparazzi_v3/package-lock.json ./
RUN npm ci
COPY paparazzi_v3/ .
RUN npm run build

# Server port
EXPOSE 3312

# Client port
EXPOSE 3000

# Start the server and frontend
CMD ["sh", "-c", "cd /app/paparazzi_server && node server.js & cd /app/paparazzi_v3 && npm run build && npx serve dist"]