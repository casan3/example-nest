FROM node:lts-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./dist /app
CMD node main.js
EXPOSE 3000