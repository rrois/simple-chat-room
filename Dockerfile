FROM node:4-onbuild

LABEL maintainer rois_r@hotmail.com

EXPOSE 8080

RUN mkdir -p /usr/src/simple-chat-room
WORKDIR /usr/src/simple-chat-room

COPY package.json /usr/src/simple-chat-room
RUN npm install

WORKDIR /usr/src/simple-chat-room/app

CMD ["node", "app"]

VOLUME /usr/src/simple-chat-room/app
