FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]