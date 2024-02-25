# syntax=docker/dockerfile:1

# 로컬에서 빌드로 전환

FROM nginx:stable-alpine

COPY /build /usr/share/nginx/html

# nginx.conf 로컬 볼륨연결
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


