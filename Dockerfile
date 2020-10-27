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

# Build
RUN npm run build

# start application
EXPOSE 3000
CMD [ "node", "dist/app.bundle.js" ]
