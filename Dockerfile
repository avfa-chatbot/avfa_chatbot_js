FROM nikolaik/python-nodejs:latest

WORKDIR /usr/chatbot_avfa

COPY . .

RUN npm install

RUN pip install -r python/requirements.txt

RUN mv python/nltk_data /usr/local/nltk_data

EXPOSE 3000 5000

CMD ["npm", "start"]