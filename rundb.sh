#!/bin/bash

docker run -d -p 27017:27017 --name flashcards-mongo-container -v "$(pwd)/database:/data/db" shitty-multitool-mongo
