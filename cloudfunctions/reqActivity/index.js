// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise');
const cheerio = require('cheerio');
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const options = {
    uri: 'http://www.hzau.edu.cn/hdyg.htm',
    // transform: function(body) {
    //   return cheerio.load(body);
    // }
  };

  const selectActivePath = 'div.zy-mainxrx ul li'

  return await rp(options)
    .then(function(res) {
      // $(selectActivePath).each(function(i, elem) {
      //   let link = $('a', $(this)).attr('href')
      //   let sponsor = $('span', $(this)).text()
      //   let title = $('a', $(this)).attr('title')
      //   let time = $('small', $(this)).text()
      //   // console.log([link, sponsor, title, time])
      // })
      var activityNumber = db.collection('Activity').orderBy('activityNumber', 'desc').limit(1).get()
      $ = cheerio.load(res.data)
      var regNumber = new RegExp("[0-9]+")
      console.log("first Number", regNumber)
      $(selectActivePath).each(function(i, elem) {
        let link = $('a', $(this)).attr('href')
        console.log(regNumber.exec(link))
        // console.log(regNumber.exec(link), activityNumber)
        // let sponsor = $('span', $(this)).text()
        // let title = $('a', $(this)).attr('title')
        // let time = $('small', $(this)).text()
      })
      // console.log($)
      // return $
    })
    .catch(function(err) {
      // Crawling failed or Cheerio choked...
    });

}