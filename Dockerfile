FROM node:16

WORKDIR /home/application

COPY . /home/application

RUN cd /home/application && npm install

EXPOSE 3000

CMD npm run start