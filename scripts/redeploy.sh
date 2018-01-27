#!/bin/sh
cd ~/webapps/universal-web-boilerplate
git pull origin master
yarn
npm run build
forever restart universal-web
