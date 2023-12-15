import request from "@/utils/request"

export function insertNoticeBoard(data) { // 게시판 등록
    return request({
        url: `/api/v1/noticeboard/write`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function updateNoticeBoard(data) { // 게시판 수정
    return request({
        url: `/api/v1/noticeboard/update`,
        method: 'PUT',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function selectBoardContent(data) { // 게시판 내용 가져오기
    return request({
        url: `/api/v1/noticeboard/content`,
        method: 'GET',
        params: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function selectNoticePage() { // 게시판 페이징 개수 가져오기
    return request({
        url: `/api/v1/noticeboard/page`,
        method: 'GET',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function selectNoticeBoard(data, data2) { // 게시판 목록 가져오기
    return request({
        url: `/api/v1/noticeboard/select`,
        method: 'GET',
        params: { page: data, category: data2 },
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function selectNoticeBoardDetail(data) { // 공지사항 상세페이지 가져오기
    return request({
        url: `/api/v1/noticeboard/detail/select`,
        method: 'GET',
        params: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function selectNoticeBoardDetailList(data) { // 공지사항 상세페이지 공지사항 리스트 가져오기
    return request({
        url: `/api/v1/noticeboard/detail/list`,
        method: 'GET',
        params: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function deleteNoticeBoard(data) { // 공지사항 삭제하기
    return request({
        url: `/api/v1/noticeboard/detail`,
        method: 'DELETE',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

export function selectNoticeComment(data) { // 공지사항 댓글 가져오기
    return request({
        url: `/api/v1/noticeboard/comment`,
        method: 'GET',
        params: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

export function insertNoticeComment(data) { // 공지사항 댓글 작성하기
    return request({
        url: `/api/v1/noticeboard/comment`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

export function updateNoticeComment(data) { // 공지사항 댓글 수정하기
    return request({
        url: `/api/v1/noticeboard/comment`,
        method: 'PUT',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

export function deleteNoticeComment(data) { // 공지사항 댓글 삭제하기
    return request({
        url: `/api/v1/noticeboard/comment`,
        method: 'DELETE',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

export function likeNoticeBoard(data) { // 공지사항 좋아요 활성
    return request({
        url: `/api/v1/noticeboard/like`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

export function unlikeNoticeBoard(data) { // 공지사항 좋아요 비활성
    return request({
        url: `/api/v1/noticeboard/unlike`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

export function commentLikeNoticeBoard(data) { // 공지사항 댓글 좋아요 활성
    return request({
        url: `/api/v1/noticeboard/comment/like`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })    
}

