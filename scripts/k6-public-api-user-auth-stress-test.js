import http from 'k6/http';
import {check, sleep} from 'k6';
import {SharedArray} from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

export const options = {
    stages: [
        {duration: '5s', target: 5},
        {duration: '5s', target: 5},
        {duration: '2s', target: 50},
        {duration: '2s', target: 50},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01']
    }
}

const users = new SharedArray('Read users data csv', function () {
    return papaparse.parse(open('./users-data.csv'), {header: true}).data;
});

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    const BASE_URL = 'https://test-api.k6.io';

    const response = http.post(`${BASE_URL}/auth/token/login/`, {
        username: user.username,
        password: user.password
    });

    check(response, {
        'successful login': (res) => res.status === 200,
        'generated token': (res) => res.json('access') !== ''
    });

    sleep(1);
}