import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    stages: [{ duration: '10s', target: 10}],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}

export default function () {
    const BASE_URL = 'https://test-api.k6.io'
    const USER = {
        username: `KamenRiderZangetsu${Math.random()}`,
        email: `${Math.random()}@email.com`,
        password: 'user123'
    }
    
    const response = http.post(`${BASE_URL}/user/register/`, {
        username: USER.username,
        first_name: 'Takatora',
        last_name:'Kureshima',
        email: USER.email,
        password: USER.password
    });

    check(response, {
        'success in registering': (res) => res.status === 201
    });

    sleep(1);
}