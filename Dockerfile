FROM node:22-alpine
 
# Set working directory in container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the app
COPY . .
 
 
# Expose port 80
EXPOSE 5173
 
# Start Nginx
CMD ["npm", "run", "dev"]