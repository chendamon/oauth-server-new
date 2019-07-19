FROM node:10.16.0
WORKDIR /usr/src/app
#COPY package.json ./
# RUN npm install
COPY . /usr/src/app/
EXPOSE 3000
#ENTRYPOINT ["npm","start"]
#entrypoint
CMD ["./entrypoint.sh"]
