PROJECT_NAME=template
DOCKER_REGISTRY=mtzzhw
WEB_IMAGE=$(DOCKER_REGISTRY)/$(PROJECT_NAME)-web
DB_MIGRATE_IMAGE=$(DOCKER_REGISTRY)/$(PROJECT_NAME)-db-migrate
VERSION=latest

build-web:
	@echo "Building web Docker image: $(WEB_IMAGE):$(VERSION)..."
	docker build -t $(WEB_IMAGE):$(VERSION) ./
	@echo "Web Docker image built successfully: $(WEB_IMAGE):$(VERSION)"

build-db-migrate:
	@echo "Building db-migrate Docker image: $(DB_MIGRATE_IMAGE):$(VERSION)..."
	docker build -f ./server/model/migrations/Dockerfile -t $(DB_MIGRATE_IMAGE):$(VERSION) ./
	@echo "DB migrate Docker image built successfully: $(DB_MIGRATE_IMAGE):$(VERSION)"

build-all: build-web build-db-migrate

.PHONY: build-web build-db-migrate build-all