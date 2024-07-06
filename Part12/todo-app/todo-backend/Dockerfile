FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=

ENV PORT=3030

ENV DEBUG=todo-backend:*

USER node

CMD npm start 