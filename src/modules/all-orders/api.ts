import request from '@/scripts/request'
import orderList from '@/api-json/all_orderList.json'
export default {
    testApi: (data) => request.post(`/oms/orderList`, data),
    getOrderList: () => Promise.resolve(orderList),


}