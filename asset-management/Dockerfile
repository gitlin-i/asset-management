# syntax=docker/dockerfile:1
   
# FROM node:18-alpine AS build
# WORKDIR /asset-management
# COPY . .
# RUN yarn install --production
# RUN yarn build
# 로컬에서 빌드로 전환

FROM nginx:stable-alpine
# COPY --from=build /asset-management/build /usr/share/nginx/html
COPY /build /usr/share/nginx/html
# COPY /.nginx/nginx.conf /etc/nginx/
# nginx.conf 로컬 볼륨연결
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


