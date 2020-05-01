const cloud = require('wx-server-sdk')
cloud.init({
  env: 'test-p71z1'
})

const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  return db.collection("ClassSalary").get()
  .then(res => {
    console.log(res)
    return res
  })
  .catch(err => {
    console.log(err)
    return err
  })
}