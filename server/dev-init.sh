#!/bin/bash

npm run prisma:generate

mkdir -p server/docker/db/volumes/data

docker compose -f server/docker/compose.yml up -d --wait

npm run prisma:migrate