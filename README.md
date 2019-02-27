# marmottes-alert
A LoRa node to mobile application demo developed for the "Hack ton campus" hackathon in Grenoble.

## What
It features :
* an Arduino program listening to a button state running in a LoRa node,
* an Ionic v4 mobile application featuring a map, with a notification feature,
* a MQTT to Websocket gateway in NodeJS (in-house) to interface the application with the LoRa node connected to the TTN network

## How

At each button state change (e.g from a mechanical event), the node send a message (a "ping") to the LoRa network. The gateway, running on a host, listens to the node messages
from the TTN network. At each message , the getway send a signal to the mobile application through a websocket between this gateway and the mobile app initialized on its launch. 
When the app receives the signal, it sends a notification to the user.


**It's just a piece of code written in a couple of hours, so please be kind about quality :)**
