import request from './request.js'

export function reqLogin(username, password) {
    return request({
        method: 'post',
        url: '/login',
        data: { username, password }
    })
}