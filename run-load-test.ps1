docker-compose up -d influxdb grafana
Write-Output "--------------------------------------------------------------------------------------"
Write-Output "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
Write-Output "--------------------------------------------------------------------------------------"
$scriptname=$args[0]
docker-compose run --rm k6 run /scripts/$scriptname.js