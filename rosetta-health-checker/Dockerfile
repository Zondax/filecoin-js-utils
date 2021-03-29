FROM node:15.12.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 9080

CMD ["npm", "run", "start"]