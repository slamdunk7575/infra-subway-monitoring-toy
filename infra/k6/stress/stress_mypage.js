import http from 'k6/http';
import { check, sleep } from 'k6';
import { 메인_페이지_로딩, 페이지_로딩_확인 } from "./stress_main.js";

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
const USERNAME = 'slamdunk7575@test.com';
const PASSWORD = '1234';

export default function () {

    let 로딩된_페이지 = 메인_페이지_로딩();
    페이지_로딩_확인(로딩된_페이지);

    let 발급된_토큰 = 로그인_요청();
    로그인_확인(발급된_토큰);

    let 내정보 = 내정보_확인_요청(발급된_토큰);
    내정보_확인(내정보);

    sleep(1);
};

export function 로그인_요청() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
};

export function 로그인_확인(발급된_토큰) {
    check(발급된_토큰, {
        'Login Successfully': (resp) => resp.json('accessToken') !== '',
    });
};

export function 내정보_확인_요청(발급된_토큰) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${발급된_토큰.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
};

export function 내정보_확인(내정보) {
    check(내정보, { 'View My Information' : (obj) => obj.id != 0 });
};
