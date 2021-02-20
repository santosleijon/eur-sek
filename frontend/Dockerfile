FROM node:15.9.0-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --silent

# Bundle app files
COPY . ./

# Expose port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]