// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const rp = require('request-promise');
const cheerio = require('cheerio');
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const options = {
    uri: 'http://www.hzau.edu.cn/hdyg.htm',
    transform: function(body) {
      return cheerio.load(body);
    }
  };

  const selectActivePath = 'div.zy-mainxrx ul li'

  rp(options)
    .then(function($) {
      $(selectActivePath).each(function(i, elem) {
        let link = $('a', $(this)).attr('href')
        db.collection("Activity")
        let sponsor = $('span', $(this)).text()
        let title = $('a', $(this)).attr('title')
        let time = $('small', $(this)).text()
        console.log(sponsor, title, time, link)
      })
    })
    .catch(function(err) {
      // Crawling failed or Cheerio choked...
    });

}