# pull official base image
FROM node:13.12.0-alpine
# set working directory
COPY . /web
WORKDIR /web

EXPOSE 3000
RUN npm i
CMD [ "npm", "start" ]


