# syntax=docker/dockerfile:1
FROM python:3.11-alpine

WORKDIR /fastapi
COPY ./requirements.txt /fastapi/requirements.txt
RUN apk update && \
    apk add --no-cache python3-dev mysql-dev build-base pkgconfig \
    rm -rf /var/cache/apk/* 
RUN pip install -r /fastapi/requirements.txt
# RUN pip install --no-cache-dir --upgrade -r /fastapi/requirements.txt
RUN pip install uvloop
COPY ./app /fastapi/app
WORKDIR /fastapi/app
EXPOSE 8123
CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8123" ]