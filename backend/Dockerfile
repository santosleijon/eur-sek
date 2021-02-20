FROM node:15.9.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app files
COPY . .

# Expose port
EXPOSE 3001

# Start server app
CMD ["node", "server.js"]