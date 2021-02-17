#!/bin/bash

echo "Starting ZAP..."
container="$(docker run -u zap -p 8765:8765 -d owasp/zap2docker-weekly zap.sh -daemon -host 0.0.0.0 -port 8765 -config api.disablekey=true -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true)"
while ! curl --silent --output /dev/null http://127.0.0.1:8765/
do
  sleep 2
done

hostIp=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)

docker exec $container zap-cli -p 8765 status
docker exec $container zap-cli -p 8765 session new
docker exec $container zap-cli -v -p 8765 quick-scan -s all --spider -r -l Medium http://$hostIp:8001/
docker stop $container > /dev/null
docker rm $container > /dev/null
