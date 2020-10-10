FROM node:alpine

# Install app dependencies
COPY . .
RUN rm -rf node_modules
RUN rm -rf .next
RUN rm package-lock.json
RUN npm install
RUN npm run build
EXPOSE 3000

CMD [ "npm", "start" ]