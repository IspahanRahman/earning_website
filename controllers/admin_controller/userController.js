const conn = require('../../config/database');
const pagination = require("../../middlewares/pagination");

// Helper function to wrap db.query in a promise
function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
      conn.query(query, values, (err, result) => {
          if (err) reject(err);
          else resolve(result);
      });
  });
}

// Helper function to wrap db.query in a promise
function queryAsyncWithoutValue(query) {
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}


const user_profile = async (req, res) => {
  try{
    const adminToken = req.cookies.adminToken;
    const {user_id} = req.query;
    const q = "SELECT * FROM users JOIN plan ON users.user_id=plan.user_id JOIN WHERE users.user_id =?";
    const userInfo = await queryAsync(q,user_id);
    if(userInfo.length==0){
      return res.status(200).json({message:"User details not found"});
    }
    else{
      res.render('admin/user/user_list',{
        user: userInfo,
        adminType:adminToken,
    });
    }
    conn.query(q,(err, user) =>{
        if(err) throw err;
        res.status(200).send({
            status: "success",
            message: "",
            data: user
        })
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports ={
  user_profile
}