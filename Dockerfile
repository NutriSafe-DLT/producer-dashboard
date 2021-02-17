FROM node:14

WORKDIR /producer-dashboard
# Install app dependencies
COPY . .
COPY ["package.json", "package-lock.json*", "./"]

# RUN rm -rf node_modules
RUN rm -rf .next && rm package-lock.json
RUN apt-get update && apt install git -y && git --version && npm install --silent
# We need to build the dashboard itself so if there are any errors the docker image publishing will fail
RUN npm run build
RUN chmod u+x ./start.sh
EXPOSE 3000

CMD [ "./start.sh" ]


# docker run -p 80:3000 -e NEXT_PUBLIC_COMPANY_NAME=BrangusMSP -e NEXT_PUBLIC_API_URL=http://137.193.65.47:8080 -d --network <network-name> --hostname brangusdashboard --name brangus-dashboard nutrisafedlt/producerdashboard