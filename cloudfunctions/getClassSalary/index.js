const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-p71z1'
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection("ClassSalary").get({
    success(res){
      console.log(res.data)
      return res
    },
    fail(err){
      console.log(err)
      return err
    }
  })
}