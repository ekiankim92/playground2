#!/bin/bash

docker rm -f dlw-dev || true

docker rmi dlw-dev || true

docker build -t dlw-dev -f apps/rtkproject/...

docker run it \
    -p 4000:4000 \
    -v ${pwd}:/app \
    --name dlw-dev \
    dlw-dev