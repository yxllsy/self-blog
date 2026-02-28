import request from "../utils/https.js";
export const commonApi = {
    getSelfDes(params: object) {
        return request({
            url: '/manage/getSelfDes',
            method: 'get',
            params
        });
    },
    getUserLocation(params: object) {
        return request({
            url: '/manage/getUserLocation',
            method: 'get',
            params
        });
    },
    getArticleList(params: object) {
        return request({
            url: '/article/getAllArticle',
            method: 'get',
            params
        });
    },
    getArticle(params: object) {
        return request({
            url: '/article/getArticle',
            method: 'get',
            params
        });
    },
    issueArticle(data: object) {
        return request({
            url: '/article/issue',
            method: 'post',
            data
        });
    },
}
