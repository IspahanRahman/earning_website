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

const aboutPage = async(req,res)=>{
  try{
    const query = "SELECT *FROM website_info";
    const website_info = await queryAsyncWithoutValue(query);
    return res.render("api/about",{
      login_status: req.login_status,
      website_info,
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports ={
  aboutPage
}