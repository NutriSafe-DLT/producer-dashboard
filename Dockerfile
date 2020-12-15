FROM node:14

# Install app dependencies
COPY . .
# RUN rm -rf node_modules
RUN rm -rf .next
RUN rm package-lock.json
RUN apt-get update
RUN apt-get install --assume-yes git 
RUN apt-get upgrade --assume-yes
RUN npm install --silent
EXPOSE 3000

CMD [ "npm", "run", "build-start" ]

# run with docker run -p 80:3000 -e NEXT_PUBLIC_COMPANY_NAME=DeoniMSP -e NEXT_PUBLIC_API_URL=http://137.193.65.47:8080 <image-name>