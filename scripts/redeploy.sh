#!/bin/sh
cd ~/webapps/node-api-boilerplate
git pull origin master
yarn
npm run build
forever restart universal-web
