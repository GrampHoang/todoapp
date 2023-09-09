# Use the official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code to the container
COPY . .

# Expose the port your FeatherJS server is running on (e.g., 3030)
EXPOSE 3030

# Start the FeatherJS server
CMD [ "npm", "start" ]
