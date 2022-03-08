FROM node:16.14-slim
COPY . .
RUN npm install
EXPOSE 8080
CMD npm start
