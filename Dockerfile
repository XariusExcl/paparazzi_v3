# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Set the working directory to the server folder and install dependencies
WORKDIR /app/paparazzi_server
COPY paparazzi_server/package.json .
RUN npm install
COPY paparazzi_server/ .

# Set the working directory to the frontend folder and install dependencies
WORKDIR /app/paparazzi_v3
COPY paparazzi_v3/package.json paparazzi_v3/package-lock.json ./
RUN npm ci
COPY paparazzi_v3/ .
RUN npm run build

# Expose the server port
EXPOSE 3312

# Expose the client port
EXPOSE 3000

# Start the server and frontend
CMD ["sh", "-c", "cd /app/paparazzi_server && node server.js & cd /app/paparazzi_v3 && npm run build && npx serve dist"]