import { defineStore } from 'pinia'
import { reqGetRights, reqGetRolesList, reqAddRoles, reqUpdateRolesInfoById, reqDeleteRolesById, reqDeleteRightsById, reqSetRightsByRoleId } from '@/utils/api'
import { ElMessage } from "element-plus";

export const useRightsStore = defineStore('rights', {
    state: () => (
        {
            // 权限列表
            rightList: [],
            //权限列表以树状形式
            rightTreeList: [],
            // 角色列表
            rolesList: [],
            // 分配权限默认选择的key值列表，也就是id
            checkedKeys: [],
            // 当前分配角色的id
            curRoleId: '',
            // 添加和编辑之间的切换
            isAddRoles: false,
            // 添加或修改对话框的显示和影藏
            dialogVisible: false,
            // 分配权限对话框的显示和隐藏
            setRightsDialogVisible: false,
            // 添加或修改用户的数据
            addOrModifyData: {
                roleName: "",
                roleDesc: "",
            },
        }
    ),
    getters: {
    },
    actions: {
        //发送获取权限列表的请求
        async getRightsList() {
            let { data: res } = await reqGetRights("list");
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.rightList = res.data
        },
        //发送获取角色列表的请求
        async getRolesList() {
            let { data: res } = await reqGetRolesList();
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.rolesList = res.data
        },
        // 发送添加用户的请求
        async addRoles() {
            let { data: res } = await reqAddRoles(this.addOrModifyData);
            if (res.meta.status != 201) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            //   更新表格数据
            this.getRolesList();
        },
        // 通过指定id与修改后的值修改指定用户
        async updateRolesInfoById() {
            let { data: res } = await reqUpdateRolesInfoById(this.addOrModifyData.id, this.addOrModifyData)
            console.log(res)
            if (res.meta.status != 200) return ElMessage({ message: "修改成功", showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            //   更新表格数据
            this.getRolesList();
        },
        // 通过指定id删除角色
        async deleteRolesById(id) {
            let { data: res } = await reqDeleteRolesById(id)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            //   更新表格数据
            this.getRolesList();
        },
        // 通过id删除角色指定权限
        async deleteRightsById(rolesRights, rightId) {
            let { data: res } = await reqDeleteRightsById(rolesRights.id, rightId)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            let result = this.rolesList.find(item => item.id == rolesRights.id)
            // 因为进行了浅拷贝，所以会改变原数据
            result.children = res.data
        },
        //发送获取权限列表（树状形式）的请求
        async getRightsTreeList() {
            let { data: res } = await reqGetRights("tree");
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.rightTreeList = res.data
        },
        // 给指定角色授权
        async setRightsByRoleId(rids) {
            let { data: res } = await reqSetRightsByRoleId(this.curRoleId, { rids })
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getRolesList()
        }
    },
})