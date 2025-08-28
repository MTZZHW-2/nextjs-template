#!/bin/bash

docker compose -f docker/compose.dev.yml up -d --wait

npm run prisma:generate:dev

npm run prisma:migrate:dev
