// pages/addTodo/addTodo.js
const db = wx.cloud.database()
const _ = db.command
const exams = db.collection('ExamDafault')
const target = db.collection('Target')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examDafault: [],
    target: [],
    targetDate: "",
    targetName: "",
    targetIntro: "",
    minDate: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getToday()
    this.reqDafaultExam();
    this.reqTarget();
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

  reqDafaultExam: function() {
    exams.where({
        examTime: _.gte(new Date)
      }).get()
      .then(res => {
        console.log(res.data)
        res.data.map((value, index) => {
          let nowDate = new Date
          let diffDate = value.examTime - nowDate
          let days = Math.floor(diffDate / (24 * 3600 * 1000))
          value.examTime = value.examTime.toLocaleDateString()
          value.countDown = days
        })
        this.setData({
          examDafault: res.data
        })
      })
  },
  reqTarget: function() {
    target.get()
      .then(res => {
        console.log(res.data)
        res.data.map((value, index) => {
          let nowDate = new Date
          let diffDate = value.targetTime - nowDate
          let days = Math.floor(diffDate / (24 * 3600 * 1000))
          value.targetTime = value.targetTime.toLocaleDateString()
          value.countDown = days
        })
        console.log(res.data)
        this.setData({
          target: res.data
        })
      })
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
    console.log(event.detail)
  },
  onCustomChange(event) {
    if (event.target.id == "name") {
      this.setData({
        targetName: event.detail.value,
      })
    }
    if (event.target.id == "intro") {
      this.setData({
        targetIntro: event.detail.value
      })
    }
  },
  onDateChange(event) {
    console.log(event.detail)
    this.setData({
      targetDate: event.detail.value
    })
  },
  addTarget() {
    console.log("被调用")
    target.add({
      data: {
        targetTime: new Date(this.data.targetDate),
        targetName: this.data.targetName,
        targetIntro: this.data.targetIntro,
        creatTime: new Date
      }
    }).then(res => {
      reqTarget()
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
})