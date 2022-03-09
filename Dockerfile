FROM node:14-bullseye

RUN mkdir /app-data

WORKDIR /app-data

COPY . .

RUN npm install

EXPOSE 8080

CMD npm start
