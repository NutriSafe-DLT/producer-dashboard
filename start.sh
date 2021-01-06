#!/bin/bash
echo "NEXT_PUBLIC_COMPANY_NAME=$NEXT_PUBLIC_COMPANY_NAME" > .env.production
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production
npm run build-start