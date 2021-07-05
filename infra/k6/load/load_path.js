import http from 'k6/http';
import { check, sleep } from 'k6';
import { 메인_페이지_로딩, 페이지_로딩_확인 } from "./smoke_main.js";

export let options = {
    stages: [
        { duration: '2s', target: 0 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

const BASE_URL = 'https://slamdunk7575.kro.kr/';
const 건대입구_ID = 130;
const 잠실_ID = 100;

export default function () {

    let 로딩된_페이지 = 메인_페이지_로딩();
    페이지_로딩_확인(로딩된_페이지);

    let 경로_조회_결과 = 경로_조회_요청(건대입구_ID, 잠실_ID);
    let 예상_출발역 = '건대입구';
    let 예상_도착역 = '잠실';
    let 예상_거리 = 4
    경로_조회_확인(경로_조회_결과, 예상_출발역, 예상_도착역, 예상_거리);
};

export function 경로_조회_요청(sourceId, targetId) {
    return http.get(`${BASE_URL}/paths?source=` + sourceId + `&target=` + targetId).json();
};

export function 경로_조회_확인(조회_결과, 예상_출발역, 예상_도착역, 예상_거리) {
    check(조회_결과, {
        'Source Station Check' : (response) => response.stations[0].name == 예상_출발역,
        'Target Station Check' : (response) => response.stations[response.stations.length - 1].name == 예상_도착역,
        'Distance Check' : (response) => response['distance'] == 예상_거리,
    });
};
