FROM node:12.12-alpine

RUN addgroup -S graphql && adduser graphql -S -G graphql
RUN mkdir -p /home/graphql
RUN chown graphql /home/graphql
WORKDIR /home/graphql
COPY . .

RUN npm install -g nodemon

USER graphql
RUN npm install

ENV GATEWAY http://gateway.openfaas:8080
ENV APPS_URL http://apps
ENV USER_INFO_URL http://user-info

EXPOSE 4000
ENTRYPOINT ["nodemon"]
CMD ["src/index.js"]
