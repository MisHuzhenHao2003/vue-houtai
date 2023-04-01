import request from './request.js'

// 登录
export function reqLogin(username, password) {
    return request({
        method: 'post',
        url: '/login',
        data: { username, password }
    })
}

// 获取菜单列表
export function reqGetMenus() {
    return request({
        method: 'get',
        url: '/menus'
    })
}
// 获取用户数据列表
export function reqGetUsers(params) {
    return request.get('/users', params)
}
// 修改用户状态
export function reqUpdateUserState(uid, status) {
    return request.put(`/users/${uid}/state/${status}`)
}
// 添加用户
export function reqAddUser(data) {
    return request.post("/users", data)
}
// 编辑用户
export function reqUpdateUserInfoById(id, data) {
    return request.put(`users/${id}`, data)
}
// 通过id删除指定用户
export function reqDeleteUserById(id) {
    return request.delete(`users/${id}`)
}