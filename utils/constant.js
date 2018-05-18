//url 相关
var BASE_URL = "http://gank.io/api";
var GET_URL = BASE_URL.concat("/history/content/10/1");

//error 相关
var ERROR_DATA_IS_NULL = "获取数据为空，请重试";

//各个page 的url
var PAGE_MAIN = "/pages/main/main";
var PAGE_SPECIFIC = "/pages/specific/specific";
var PAGE_POST = "/pages/post/post";

module.exports = {
    BASE_URL: BASE_URL,
    GET_URL: GET_URL,
    ERROR_DATA_IS_NULL: ERROR_DATA_IS_NULL,
    PAGE_MAIN: PAGE_MAIN,
    PAGE_SPECIFIC: PAGE_SPECIFIC,
    PAGE_POST: PAGE_POST
}