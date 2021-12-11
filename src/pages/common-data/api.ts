// 公共api

import request from '@/scripts/request'
import userInfoJson from '../../api-json/userInfo.json'
export default {
    testApi: () => request.post(`/oms/userinfo`),
    getUserInfo: () => Promise.resolve(userInfoJson),


}