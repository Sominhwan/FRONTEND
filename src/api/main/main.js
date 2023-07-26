import request from "@/utils/request"

export function getBoard() {
    return request({
        url: `/api/v1/main/board`,
        method: 'GET',
        meta: { apiVersion: '1.0.0' },
        headers: { 'Content-Type': 'application/json;charset=utf8' }
    })
}

// export { allProductList }