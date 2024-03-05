FROM node:20
WORKDIR /courseup
COPY /lib/wss/package.json .
COPY /lib/wss/package-lock.json .
RUN npm ci
COPY /lib/wss .
EXPOSE 1738
CMD ["npm", "start"]