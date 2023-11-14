const conn = require('../config/database');

const admin = async (req, res, next) =>{
  try{
    const adminToken = req.cookies.adminToken;
    const q = 'SELECT *FROM admin WHERE id=?'
    
    if(adminToken){
        conn.query(q,[adminToken[0].id],(err,result) => {
            if(adminToken[0].email == result[0].email && adminToken[0].password == result[0].password){
                return next();
            }else{
                res.clearCookis('adminToken');
                res.redirect('/');
            }
        })
    }else{
        res.redirect('/');
    }
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports = admin;