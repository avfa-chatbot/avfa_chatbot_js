FROM node:12

WORKDIR /usr/chatbot_avfa

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]