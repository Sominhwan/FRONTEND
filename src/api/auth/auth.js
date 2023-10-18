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
export function signIn(data) { // 로그인
    return request({
        url: `/api/v1/auth/login`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
export function logout(data) { // 로그아웃
    return request({
        url: `/api/v1/auth/logout`,
        method: 'GET',
        meta: { apiVersion: '1.0.0' },
        headers: { 
            'Content-Type': 'application/json;charset=utf8',
            Authorization: data,
        },
        withCredentials: true
    })
}
export function userInfo(data) { // 유저 인증정보
    return request({
        url: `/api/v1/auth//user`,
        method: 'GET',
        meta: { apiVersion: '1.0.0' },
        headers: { 
            'Content-Type': 'application/json;charset=utf8',
            Authorization: data,
        },
        withCredentials: true
    })
}
export function checkId(data) { // 비밀번호 찾기(아이디 인증)
    return request({
        url: `/api/v1/auth/id`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
export function checkPhoneNum(data) { // 비밀번호 찾기(휴대폰번호 인증)
    return request({
        url: `/api/v1/auth/phonenum`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
export function reCAPTCHA(data) { // reCAPTCHA 인증
    return request({
        url: `/api/v1/auth/recaptcha`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
export function changePassword(data) { // 비밀번호 변경
    return request({
        url: `/api/v1/auth/password`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
export function sendEmail(data) { // 이메일 인증
    return request({
        url: `/api/v1/auth/email`,
        method: 'POST',
        data: data,
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}