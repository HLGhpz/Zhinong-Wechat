// pages/home/home.js
const db = wx.cloud.database().collection('news')
Page({
  getData(){
    wx.cloud.callFunction({
      name: "getClassSalary",
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  }
})