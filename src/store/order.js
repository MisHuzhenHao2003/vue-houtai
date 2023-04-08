import { defineStore } from 'pinia'
import { reqGetOrderList, reqGetLogistics } from "@/utils/api"
import { ElMessage } from "element-plus";

export const useOrderStore = defineStore('order', {
    state: () => (
        {
            // 获取订单列表所需的参数
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 5
            },
            total: 0,
            orderList: [],
            dialogVisible: false,
            logisticsVisible: false,
            // logistics: [],
        }

    ),
    getters: {

    },
    actions: {
        // 获取订单列表
        async getOrderList() {
            let { data: res } = await reqGetOrderList(this.queryInfo)
            if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
            this.orderList = res.data.goods
            this.total = res.data.total
        },
        // 获取物流进度
        // async getLogistics(order_number) {
        //     let { data: res } = await reqGetLogistics(order_number)
        //     if (res.meta.status != 200) return ElMessage({ message: res.meta.msg, showClose: true, type: "warning" });
        //     this.logistics = res.data
        // },
    }
})