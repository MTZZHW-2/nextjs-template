PROJECT_NAME=template
DOCKER_REGISTRY=mtzzhw
WEB_IMAGE=$(DOCKER_REGISTRY)/$(PROJECT_NAME)-web
DB_MIGRATE_IMAGE=$(DOCKER_REGISTRY)/$(PROJECT_NAME)-db-migrate
VERSION=latest

build-web:
	@echo "正在构建 web 镜像: $(WEB_IMAGE):$(VERSION)..."
	docker build -t $(WEB_IMAGE):$(VERSION) ./
	@echo "web 镜像构建成功: $(WEB_IMAGE):$(VERSION)"

build-db-migrate:
	@echo "正在构建 db-migrate 镜像: $(DB_MIGRATE_IMAGE):$(VERSION)..."
	docker build -f ./server/model/migrations/Dockerfile -t $(DB_MIGRATE_IMAGE):$(VERSION) ./
	@echo "db-migrate 镜像构建成功: $(DB_MIGRATE_IMAGE):$(VERSION)"

build-all: build-web build-db-migrate

.PHONY: build-web build-db-migrate build-all
