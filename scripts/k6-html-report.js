import http from 'k6/http';
import {check} from 'k6';
import {htmlReport} from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        checks: ['rate > 0.99']
    }
}
export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles'

    const response = http.get(BASE_URL);

    check(response, {
        'status is 200': (res) => res.status === 200
    })
}

export function handleSummary(data) {
    return {
        "/reports/summary.html": htmlReport(data),
    };
}