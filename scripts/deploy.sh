#!/bin/sh
cd ~/webapps/node-api-boilerplate
git pull origin master
yarn
npm run build
npm run start
