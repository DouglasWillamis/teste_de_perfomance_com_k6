import http from 'k6/http';
import {check, sleep} from 'k6';
import {SharedArray} from 'k6/data';

export const options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '10s', target: 10},
        {duration: '10s', target: 0}
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(90) < 200']
    }
}

const crocodiles = new SharedArray('Read crocodiles data json', function () {
    return JSON.parse(open('./crocodiles-data.json'))
})
export default function () {
    const crocodile = crocodiles[Math.floor(Math.random() * crocodiles.length)]

    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodile.id}`

    const response = http.get(BASE_URL);

    check(response, {
        'status is 200': (res) => res.status === 200
    })

    sleep(1)
}