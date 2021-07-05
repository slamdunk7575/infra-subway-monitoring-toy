import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 200 },
        { duration: '10s', target: 400 },
        { duration: '20s', target: 400 },
        { duration: '10s', target: 600 },
        { duration: '20s', target: 600 },
        { duration: '10s', target: 800 },
        { duration: '20s', target: 800 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

const BASE_URL = 'https://slamdunk7575.kro.kr/';

export default function ()  {

    let 로딩된_페이지 = 메인_페이지_로딩();
    페이지_로딩_확인(로딩된_페이지);

    sleep(1);
};

export function 메인_페이지_로딩() {
    return http.get(`${BASE_URL}`);
}

export function 페이지_로딩_확인(로딩된_페이지) {
    check(로딩된_페이지, {
        'Lending Main page': (response) => response.status === 200
    });
}
