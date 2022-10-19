FROM node:16

WORKDIR /home/application

COPY . /home/application

RUN cd /home/application && npm install
RUN chmod +x waiting-for.sh

EXPOSE 3000

CMD npm run start