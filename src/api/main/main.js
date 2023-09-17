import request from "@/utils/request"

export function getBoard() {
    return request({
        url: `/api/v1/main/select`,
        method: 'GET',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function getWeather() {
    return request({
        url: `/api/v1/weather/get`,
        method: 'GET',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

