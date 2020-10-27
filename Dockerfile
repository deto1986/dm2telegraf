FROM node:14-alpine

# prepare workdir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# copy dependency informations & install it
COPY package*.json ./
USER node
RUN npm install

# copy code of application
COPY --chown=node:node . .

# remove env files
RUN rm .env*

# start application
EXPOSE 3000
CMD [ "node", "src/app.js" ]
