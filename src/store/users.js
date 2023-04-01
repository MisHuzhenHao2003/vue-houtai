import { defineStore } from 'pinia'
import { reqGetUsers, reqUpdateUserState, reqAddUser, reqUpdateUserInfoById, reqDeleteUserById } from "@/utils/api";
import { ElMessage } from "element-plus";


// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserInfoStore = defineStore('users', {
    state: () => ({
        // 表格数据
        users: [],
        // 参数
        queryInfo: {
            query: "",
            pagenum: 1,
            pagesize: 5,
        },
        total: "",
        addForm: {
            username: "",
            password: "",
            email: "",
            mobile: "",
        },
        // 控制添加用户的显示和隐藏
        dialogVisible: false,
        // 从修改用户对话框与添加用户对华框的切换
        isAdd: false,
    }),
    getters: {

    },
    actions: {
        // 获取用户数据
        async getUsers() {
            let { data: res } = await reqGetUsers({ params: this.queryInfo });
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.users = res.data.users;
            this.total = res.data.total;
        },
        // 通过id修改用户状态
        async updateUserState(id, mg_state) {
            let { data: res } = await reqUpdateUserState(id, mg_state);
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
        },
        // 发送添加用户的请求
        async addUser() {
            let { data: res } = await reqAddUser(this.addForm);
            if (res.meta.status != 201) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            //   更新表格数据
            this.getUsers();
        },
        // 通过指定id与修改后的值修改指定用户
        async updateUserInfoById() {
            let { data: res } = await reqUpdateUserInfoById(this.addForm.id, { email: this.addForm.email, mobile: this.addForm.mobile });
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            //   更新表格数据
            this.getUsers();
        },
        // 通过指定id与修改后的值修改指定用户
        async deleteUserById(id) {
            let { data: res } = await reqDeleteUserById(id)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            //   更新表格数据
            this.getUsers();
        },

    },
})