import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
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
