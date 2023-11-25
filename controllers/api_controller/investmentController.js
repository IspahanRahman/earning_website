const conn = require("../../config/database");

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

const investment = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "SELECT * FROM users WHERE user_id=?";
    const userInfo = await queryAsync(q,id);
    const q1 = "SELECT * FROM website_info";
    const website_info = await queryAsyncWithoutValue(q1);
    if(userInfo.length!=0){
      return res.render('api/investment',{
        login_status: req.login_status,
        userInfo:userInfo,
        website_info:website_info
      })
    }
    else{
      return res.redirect('/api/homePage');
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports = {
  investment
}