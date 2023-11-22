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

const login = async (req,res) =>{
  try{
    if(req.method == "POST"){
      const {email,password} = req.body;
        const q= "SELECT *FROM admin WHERE email=?"
        const userInfo = await queryAsync(q,email);
        if(userInfo){
          if(password == userInfo[0].password){ 
            res.cookie('adminToken',userInfo);
            res.render('admin/index',{adminType:userInfo});
            //res.redirect('/index');
        }else{
            return res.status(422).json({
                message: "Incorrect password",
            });
          }
        }
        else{
          return res.status(404).json({
            message: "Not Found",
        });
        }
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

 const dashboard = async(req,res) =>{
  try{
    return res.render("admin/index");
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports = {
  login,
  dashboard
}
