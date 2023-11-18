const conn = require('../../config/database');

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

const website_info = async (req, res) =>{
  try{
    const adminToken = req.cookies.adminToken;
    const q = "SELECT *FROM website_info";
    const website_info = await queryAsyncWithoutValue(q);
    if(website_info){
      return res.render("admin/website/website_info",{
        website_info:website_info
      })
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


const website_info_update = async (req, res) =>{
  const { about, contact_info, home_image_url, support_info } = req.body
  const values = [ about, contact_info, home_image_url, support_info ];
  const q = "UPDATE website_info SET about_info=? , contact_info= ? , home_image_url = ?, support_info=?";
  const website_info = await queryAsync(q,values);
  if(website_info){
    return res.redirect('/admin/website_info');
  }
  else{
    return res.status(500).json({message:"Something went wrong"});
  }
}

module.exports = {
  website_info,
  website_info_update
}