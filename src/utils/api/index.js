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
// 获取所有权限列表
export function reqGetRights(type) {
    return request.get(`rights/${type}`)
}
// 获取角色列表
export function reqGetRolesList() {
    return request.get(`roles`)
}
// 添加角色
export function reqAddRoles(data) {
    return request.post("/roles", data)
}
// 编辑角色
export function reqUpdateRolesInfoById(id, data) {
    return request.put(`roles/${id}`, data)
}
// 通过id删除指定角色
export function reqDeleteRolesById(id) {
    return request.delete(`roles/${id}`)
}
// 通过id删除角色指定权限
export function reqDeleteRightsById(roleId, rightId) {
    return request.delete(`roles/${roleId}/rights/${rightId}`)
}
// 通过角色id给指定角色权限
export function reqSetRightsByRoleId(roleId, data) {
    return request.post(`roles/${roleId}/rights`, data)
}
// 通过指定用户id和指定角色id给用户分配角色
export function reqSetRolesByUserIdOrRoleId(userId, data) {
    return request.put(`users/${userId}/role`, data)
}