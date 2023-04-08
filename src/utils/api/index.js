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
// 获取商品分类数据列表
export function reqGetCategories(params) {
    return request.get(`categories`, { params })
}
// 添加分类
export function reqAddCater(data) {
    return request.post(`categories`, data)
}
// 删除分类
export function reqDeleteCateById(id) {
    return request.delete(`categories/${id}`)
}
// 修改分类
export function reqUpdateById(id, data) {
    return request.put(`categories/${id}`, data)
}
// 获取动态和静态参数列表
export function regGetManyOrOnlyList(id, params) {
    return request.get(`categories/${id}/attributes`, { params })
}
// 添加动态或静态参数
export function regAddManyOrOnlyList(id, data) {
    return request.post(`categories/${id}/attributes`, data)
}
//删除参数
export function reqDeleteParams(id, attrid) {
    return request.delete(`categories/${id}/attributes/${attrid}`)
}
//编辑提交参数
export function reqUpdateParams(id, attrid, data) {
    return request.put(`categories/${id}/attributes/${attrid}`, data)
}
// 获取商品列表数据
export function reqGetGoods(params) {
    return request.get(`goods`, { params })
}
// 删除商品
export function reqDeleteGoods(id) {
    return request.delete(`goods/${id}`)
}
// 添加商品
export function reqAddGoods(data) {
    return request.post(`goods`, data)
}
// 获取订单数据列表
export function reqGetOrderList(params) {
    return request.get(`orders`, { params })
}
// 获取物流信息
export function reqGetLogistics(id) {
    return request.get(`kuaidi/${id}`,)
}
// 获取物折线图数据
export function reqGetReportsData() {
    return request.get(`reports/type/1`)
}