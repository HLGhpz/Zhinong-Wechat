// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const _ = db.command
const exams = db.collection('ExamDafault')
const todos = db.collection('Todos')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examDafault: [],
    // today: new Date
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getToday()
    this.reqDafaultExam();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  // getToday: function() {
  //   let date = new Date;
  //   let today = new Date(date.toLocaleDateString())
  //   this.setData({
  //     today: today
  //   })
  // },

  reqDafaultExam: function() {
    exams.where({
        examTime: _.gte(new Date)
      }).get()
      .then(res => {
        console.log(res.data)
        res.data.map((value, index)=>{
          let nowDate = new Date
          let diffDate = value.examTime - nowDate
          let days = Math.floor(diffDate/ (24 * 3600 * 1000))
          value.examTime = value.examTime.toLocaleDateString()
          value.countDown = days
        })
        console.log(res.data)
        this.setData({
          examDafault: res.data
        })
      })
  },
  testAdd: function() {
    exams.add({
      data: {
        examTime: new Date("2019-01-01")
      }
    }).then(res => {
      console.log("添加成功")
    })
  }
})