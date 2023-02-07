import {sleep} from 'k6'

export const options = {
    vus: 1,
    duration: '10s'
}

export default function () {
    console.log('testando o k6');
    sleep(1);
}

export function teardown(data) {
    console.log(data);
}