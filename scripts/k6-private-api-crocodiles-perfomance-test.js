import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 250']
    }
}

const BASE_URL = 'https://test-api.k6.io'

export function setup () {
    const loginResponse = http.post(`${BASE_URL}/auth/token/login/`, {
        username: 'KamenRiderZangetsu0.8036737149508169',
        password: 'user123'
    });

    return loginResponse.json('access');
}
export default function (token) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const response = http.get(`${BASE_URL}/my/crocodiles`, params);

    check(response, {
        'status is 200': (res) => res.status === 200
    });

    sleep(1);
}