#!/bin/sh

email="root@mtzzhw.com"
webroot="/var/www/certbot"

for domain in "template.com"; do
  if [ ! -d "/etc/letsencrypt/live/$domain" ]; then
    echo "申请 SSL 证书"
    certbot certonly --webroot -w $webroot --agree-tos --email $email -d $domain -d www.$domain
    echo "申请结束"
  else
    echo "重新申请 SSL 证书"
    certbot renew
    echo "重新申请结束"
  fi
done

echo "生成 DSA 参数"
mkdir -p /etc/dsa
openssl dhparam -dsaparam -out /etc/dsa/dhparam.pem 4096
echo "生成 DSA 参数成功"

# 保持容器运行
tail -f /dev/null
