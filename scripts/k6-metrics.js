import http from 'k6/http';
import {Counter, Gauge, Rate, Trend} from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '3s'
}

const calls = new Counter('number of calls');
const customGauge = new Gauge('blocked time');
const customRate = new Rate('requisition fee');
const customTrend = new Trend('waiting fee');

export default function () {
    const response = http.get('https://test.k6.io');
    calls.add(1);
    customGauge.add(response.timings.blocked);
    customRate.add(response.status === 200);
    customTrend.add(response.timings.waiting)
}