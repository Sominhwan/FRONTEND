import request from "@/utils/request"

export function signUp(data) { // 회원가입
    return request({
        url: `/api/v1/auth/join`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}