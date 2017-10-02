# simple-chat-room

Simple Chat Room es una sala de chat no persistente implementada con node y express.

## Instalación
`npm install`

## Ejecución
`node ./app/app`

## Cliente
`http://localhost:8080/`

## Docker build
`docker build -t simple-chat-room .`

## Docker run
`docker container run -p  8080:8080 --name simple-chat-room --rm -v "~\simple-chat-room\app":/usr/src/simple-chat-room/app simple-chat-room`