docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose run --rm k6 run /scripts/"$1".js
# If you need to run on k6 cloud use this command docker-compose run --rm k6 cloud /scripts/"$1".js
# Or try this docker-compose run --rm k6 run -o cloud /scripts/"$1".js