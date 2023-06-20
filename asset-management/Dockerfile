# syntax=docker/dockerfile:1
   
FROM node:18-alpine AS build
WORKDIR /asset-management
COPY . .
RUN yarn install --production
RUN yarn build


FROM nginx:1.25-alpine
COPY --from=build /asset-management/build /usr/share/nginx/html



