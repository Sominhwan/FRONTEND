import request from "@/utils/request"

export function insertNoticeBoard(data) {
    return request({
        url: `/api/v1/noticeboard/write`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function searchNoticeBoard(data) {
    return request({
        url: `/api/v1/noticeboard/search`,
        method: 'GET',
        params: { page: data },
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
