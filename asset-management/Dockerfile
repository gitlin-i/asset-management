# syntax=docker/dockerfile:1
   
FROM node:18-alpine AS build
WORKDIR /asset-management
COPY . .
RUN yarn install --production
RUN yarn build


FROM nginx:stable-alpine
COPY --from=build /asset-management/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


