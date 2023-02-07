import http from 'k6/http';
import {check} from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10s'}],
        checks: ['rate > 0.99']
    }
}
export default function () {
    const response = http.get('https://test.k6.io');

    check(response, {
        'status is 200': (res) => res.status === 201
    })
}