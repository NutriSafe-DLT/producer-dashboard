# bin/bash

docker build . --build-arg API_URL=http://137.193.65.47:8080 --build-arg COMPANY_NAME=DeoniMSP -t producerdashboard:deoni-latest
docker build . --build-arg API_URL=http://137.193.65.47:8081 --build-arg COMPANY_NAME=BrangusMSP -t producerdashboard:brangus-latest

docker push nutrisafedlt/producerdashboard