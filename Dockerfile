# Step 1: Use official Node.js image as a base
FROM node:21

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install


# Step 5: Copy the rest of the application code to the container
COPY . .

# step 6:generate dist

# Step 7: Expose the port your app runs 
EXPOSE 5000

# Step 8: start application
CMD ["npm", "start"]
