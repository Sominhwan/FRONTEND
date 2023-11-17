import request from "@/utils/request"

export function getUploadImage(data) { // 업로드한 사진 불러오기
    return request({
        url: `/api/v1/profile/upload_image`,
        method: 'GET',
        params: { "userId" : data },
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}
export function getProfileImage(data) { // 프로필 사진 불러오기
    return request({
        url: `/api/v1/profile/image`,
        method: 'GET',
        params: { "userId" : data },
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}