import request from "@/utils/request"

export function insertNoticeBoard(data) {
    return request({
        url: `/api/v1/noticeboard/search`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
