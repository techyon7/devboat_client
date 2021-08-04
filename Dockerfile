FROM node:14.15.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
# COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 8080

RUN npm run-script build
CMD ["npm", "start"]
# start app
# RUN pm2 start app.config.json
# CMD ["npm", "start"]
# pm2 --name DostSubscription start npm -- start
# RUN pm2 --name DostSubscription start npm -- start
