# Stage 1: Build the Go application
FROM node:22-alpine

# Create app dir
WORKDIR /app

# Install app dependency
COPY package*.json ./

# Run npm install
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5001

# Run the executable
CMD ["npm", "start"]