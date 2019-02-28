FROM node:8.11.3

# Setup our working directory for the app
WORKDIR /usr/src/app

# Copy over package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle the app source files
COPY . .

# Open port 3000 to web
EXPOSE 3000

# Run the server
CMD npm start

# Question: why not CDM ["npm", "start"]?