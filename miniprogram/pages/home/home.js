// pages/home/home.js
const db = wx.cloud.database().collection('news')
Page({
  addData() {
    db.add({
      data: {
        link : "cet.hzau.edu.cn",
        news: "TEST_2",
        time: "2020-04-27"
      },
      success(res){
        console.log("添加成功", res)
      },
      fail(err){
        console.log("添加失败", err)
      }
    })
  },
  getData() {
    db.get({
      success(res){
        console.log("查询数据成功", res)
      }
    })
  }
})