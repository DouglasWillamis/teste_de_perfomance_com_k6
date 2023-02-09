import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        checks: ['rate > 0.99']
    },
    ext: {
        loadimpact: {
            projectID: 3626238,
            name: "Curso K6"
        }
    }
}

export default function(){
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    const res = http.get(BASE_URL);

    check(res, {
        'status is 200': (r) => r.status === 200
    });
}