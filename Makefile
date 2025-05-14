check-docker-network:
	@if [ -z $$(docker network ls --filter name=^template-network$$ --format="{{ .Name }}") ]; then \
		echo "template-network 不存在. 正在创建..."; \
		$(MAKE) docker-network-start; \
		echo "创建成功!"; \
	else \
		echo "template-network 已存在."; \
	fi

monitor-certificate:
	@if [ ! -d "deploy/proxy/volumes/certificate/letsencrypt/live/template.com" ]; then \
		echo "找不到 SSL 证书. 正在启动 SSL 服务申请证书..."; \
		$(MAKE) docker-ssl-start; \
		echo "证书申请中..."; \
		sleep 30; \
		attempts=0; \
		while { [ ! -d "deploy/proxy/volumes/certificate/letsencrypt/live/template.com" ]; } && \
		       [ $$attempts -lt 5 ]; do \
			attempts=$$((attempts+1)); \
			echo "申请中 ($$attempts/5)..."; \
			sleep 60; \
		done; \
		if [ -d "deploy/proxy/volumes/certificate/letsencrypt/live/template.com" ]; then \
			echo "申请成功!"; \
			$(MAKE) docker-ssl-stop; \
		else \
			echo "超时: 申请失败."; \
			exit 1; \
		fi \
	else \
		echo "SSL 证书已存在."; \
	fi

# web
.PHONY: build-web
build-web:
	docker compose -f deploy/web/compose.yml build

.PHONY: start-web
start-web: check-docker-network
	docker compose -f deploy/web/compose.yml up -d

.PHONY: stop-web
stop-web:
	docker compose -f deploy/web/compose.yml down

# ssl
.PHONY: start-ssl
start-ssl:
	chmod +x deploy/ssl/volumes/scripts/entrypoint.sh
	docker compose -f deploy/ssl/compose.yml up -d

.PHONY: stop-ssl
stop-ssl:
	docker compose -f deploy/ssl/compose.yml down

# proxy
.PHONY: start-proxy
start-proxy: monitor-certificate check-docker-network
	chown -R www-data:www-data deploy/proxy/volumes/certificate/letsencrypt
	chown -R www-data:www-data deploy/proxy/volumes/dsa
	docker compose -f deploy/proxy/compose.yml up -d

.PHONY: stop-proxy
stop-proxy:
	docker compose -f deploy/proxy/compose.yml down

# network
.PHONY: start-docker-network
start-docker-network:
	docker network create template-network

.PHONY: stop-docker-network
stop-docker-network:
	docker network rm template-network
