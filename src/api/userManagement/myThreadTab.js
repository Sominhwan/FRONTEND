import request from "@/utils/request"

export function threadView(data) { // 작성글 글쓴횟수, 조회수, 좋아요 수, 댓글 수
    return request({
        url: `/api/v1/statistics/thread/view`,
        method: 'GET',
        params: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}


export function threadViewChart(data) { // 작성글 조회수 통계 데이터 가져오기
    return request({
        url: `/api/v1/statistics/detail/list`,
        method: 'GET',
        params: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
