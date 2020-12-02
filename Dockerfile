FROM node:14

ARG API_URL
ENV NEXT_PUBLIC_API_URL=$API_URL

ARG COMPANY_NAME
ENV NEXT_PUBLIC_COMPANY_NAME=$COMPANY_NAME

# Install app dependencies
COPY . .
# RUN rm -rf node_modules
RUN rm -rf .next
RUN rm package-lock.json
RUN apt-get update
RUN apt-get install --assume-yes git 
RUN apt-get upgrade --assume-yes
RUN npm install --silent
RUN npm run build
EXPOSE 3000

CMD [ "npm", "run", "start" ]