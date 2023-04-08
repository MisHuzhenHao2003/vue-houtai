import { defineStore } from 'pinia'
import { reqGetCategories, reqDeleteGoods, reqAddGoods, reqGetGoods, regAddManyOrOnlyList, reqUpdateParams, reqDeleteParams, regGetManyOrOnlyList, reqAddCater, reqDeleteCateById, reqUpdateById } from "@/utils/api"
import { ElMessage } from "element-plus";

export const useGoodsStore = defineStore('goods', {
    state: () => (
        {
            // 分类列表1、2、3级
            categories: [],
            categoriesAll: [],
            // 父级列表
            PreCategories: [],
            // 商品列表
            goods: [],
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            // 商品总数量
            total: 0,
            Params: {
                type: 3,
                pagenum: 1,
                pagesize: 3,
            },
            // 所选择分类的id列表
            cateKeys: [],
            total: 0,
            // 添加分类的参数
            addCate: {
                cat_pid: 0,
                cat_name: "",
                cat_level: 0
            },
            // 所要更新分类的id
            curCate_id: 0,
            // 添加与修改·分类的对话框的显示和隐藏
            dialogVisible: false,
            // false添加，true修改
            isAddOrUpdate: false,
            activeName: "many",
            // 动态和静态参数列表
            manyTableData: [],
            onlyTableData: [],
            isDisable: true,
            // 动静态参数名称和参数id
            goodsParams: {
                attr_id: 0,
                manyParams: '',
                onlyAttr: ''
            },
            // 参数对话框的显示和隐藏
            ParamsDialogVisible: false,
            // 标签页项激活的名字
            activeIndex: '0',
            // 图片上传所需要的token
            token: sessionStorage.getItem('TOKEN') || ''
        }
    ),
    getters: {

    },
    actions: {
        // 获取商品1、2、3级分类数据列表(指定数量)
        async getCategories() {
            let { data: res } = await reqGetCategories(this.Params)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.categories = res.data.result
            this.total = res.data.total
        },
        // 获取商品1、2、3级分类数据列表(全部)
        async getCategoriesAll() {
            let { data: res } = await reqGetCategories()
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.categoriesAll = res.data
        },
        // 获取父级商品分类数据列表（1、2级）
        async getParCategories() {
            let { data: res } = await reqGetCategories({ type: 2 });
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.PreCategories = res.data
        },
        // 修改分类
        async updateById() {
            let { data: res } = await reqUpdateById(this.curCate_id, { cat_name: this.addCate.cat_name });
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getCategories()
        },
        // 删除分类
        async deleteCateById(id) {
            let { data: res } = await reqDeleteCateById(id);
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getCategories()
        },
        // 添加分类
        async addCater() {
            let data = this.addCate
            console.log(data)
            if (this.cateKeys.length > 0) {
                data = { ...data, cat_pid: this.cateKeys[this.cateKeys.length - 1], cat_level: this.cateKeys.length }
            }
            let { data: res } = await reqAddCater(data);
            if (res.meta.status != 201) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getCategories()
        },
        // 获取动态和静态参数列表
        async getManyOrOnlyList() {
            let { data: res } = await regGetManyOrOnlyList(this.cateKeys[this.cateKeys.length - 1], { sel: this.activeName })
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            if (this.activeName == 'many') {
                this.manyTableData = res.data
                this.manyTableData.forEach((item) => {
                    item.attr_vals = item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
                    // 控制每一行新增按钮和input框的显示和颖仓
                    item.inputVisible = false
                    // 拿到input值
                    item.inputValue = ''
                })
            }
            else {
                this.onlyTableData = res.data
                this.onlyTableData.forEach((item) => {
                    item.attr_vals = item.attr_vals.length == 0 ? [] : item.attr_vals.split(' ')
                    // 控制每一行新增按钮和input框的显示和颖仓
                    item.inputVisible = false
                    // 拿到input值
                    item.inputValue = ''
                })
            }

        },
        // 添加动态参数和静态属性
        async addManyOrOnlyList() {
            let paramsOrAttrName = this.activeName == 'many' ? this.goodsParams.manyParams : this.goodsParams.onlyAttr
            let { data: res } = await regAddManyOrOnlyList(this.cateKeys[this.cateKeys.length - 1], { attr_name: paramsOrAttrName, attr_sel: this.activeName })
            if (res.meta.status != 201) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getManyOrOnlyList()
        },
        // 删除参数或属性
        async deleteParams() {
            let { data: res } = await reqDeleteParams(this.cateKeys[this.cateKeys.length - 1], this.goodsParams.attr_id)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getManyOrOnlyList()
        },
        //编辑参数或属性
        async updateParams() {
            let paramsOrAttrName = this.activeName == 'many' ? this.goodsParams.manyParams : this.goodsParams.onlyAttr
            let { data: res } = await reqUpdateParams(this.cateKeys[this.cateKeys.length - 1], this.goodsParams.attr_id, { attr_name: paramsOrAttrName, attr_sel: this.activeName })
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getManyOrOnlyList()
        },
        //提交参数或属性
        async putParamsOrAttr(cat_id, attr_id, data) {
            console.log(data)
            let { data: res } = await reqUpdateParams(cat_id, attr_id, data)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
        },
        // 获取商品列表
        async getGoods() {
            let { data: res } = await reqGetGoods(this.queryInfo)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.goods = res.data.goods
            this.total = res.data.total
        },
        // 删除商品
        async deleteGoods(id) {
            let { data: res } = await reqDeleteCateById(id);
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getCategories()
        },
        // 添加商品
        async addGoods(data) {
            console.log(data)
            let { data: res } = await reqAddGoods(data);
            if (res.meta.status != 201) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            ElMessage({ message: res.meta.msg, showClose: true, type: "success" });
            this.getCategories()
        },
    },
})