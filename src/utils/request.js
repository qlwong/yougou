// 封装发送请求的函数
let request = function(url, data={}, header={}, method = "get") {
  return new Promise((resolve, reject) => {
    //   逻辑处理
    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      success: function(res) {
        resolve(res);
      },
      fail: function(res) {
        reject(res);
      }
    });
  });
};

request.get=function(url,data){
  return request(url,data,{},'get')
}
// 暴露出去
export default request;
