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


const addUser = async (req, res) => {
  try{
    const { name, mobile, password,confirm_password,referer_code } = req.body;
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }

  var pattern = /^[a-zA-Z_0-9]+$/;
  var value = pattern.test(username);

  if(value){
      const q = "SELECT *FROM users WHERE username = ?";
      conn.query(q,[username],(err,result0)=>{
      if(Object.keys(result0).length == 0){
  
          if (!req.file) {
              const q = "SELECT *FROM users WHERE refer_code=?"
              conn.query(q,[referer_code],(err,result)=>{
                  if(err) throw err;
                  if(Object.keys(result).length == 0){
                      res.status(409).send({
                          status: "fail",
                          message: "Referer code Not Found",
                          data: {}
                     });
                  }
                  else{
                      const insertData = "INSERT INTO users(name,username,mobile,email,password,date_of_birth,division_id, district_id, upazilla_id, referer_code)VALUES(?,?,?,?,?,?,?,?,?,?)"
                      conn.query(insertData, [name,username,mobile,email,password,date_of_birth,division_id, district_id, upazilla_id, referer_code], (err, result) => {
                          if (err) throw err
                          console.log("file uploaded")
                          const q = "SELECT *FROM users WHERE username = ?";
                          conn.query(q,[username],(err, user) =>{
                              if(err) throw err;
                              const user_id = user[0].user_id;
                              const refer_code = 1000+user_id;
                              const q = "UPDATE users SET refer_code=? WHERE user_id=?";
                              conn.query(q,[refer_code,user_id],(err,refer_result)=>{
                                  if(err) throw err;
                                      const q = "SELECT *FROM users WHERE user_id = ?";
                                      conn.query(q,[user_id],(err,resultUser)=>{
                                          if(err) throw err;
                                          res.send({
                                                  status: "success",
                                                  message: "",
                                                  data: resultUser[0]
                                          });
                                      })
                                  })
                              })
                      })
                  }
              })
          } else {
              console.log(req.file.filename)
              const imgsrc = 'https://nirvabna.store/image/' + req.file.filename
              const q = "SELECT *FROM users WHERE refer_code=?"
              conn.query(q,[referer_code],(err,result)=>{
                  if(err) throw err;
                  if(Object.keys(result).length == 0){
                      res.status(409).send({
                          status: "fail",
                          message: "Referer code Not Found",
                          data: {}
                     });
                  }
                  else{
                      const insertData = "INSERT INTO users(name,username,mobile,email,password,date_of_birth,division_id, district_id, upazilla_id, referer_code,image)VALUES(?,?,?,?,?,?,?,?,?,?,?)"
                      conn.query(insertData, [name,username,mobile,email,password,date_of_birth,division_id, district_id, upazilla_id, referer_code,imgsrc], (err, result) => {
                          if (err) throw err;
                              console.log("file uploaded")
                              const q = "SELECT *FROM users WHERE username = ?";
                              conn.query(q,[username],(err, user) =>{
                                  if(err) throw err;
                                  const user_id = user[0].user_id;
                                  const refer_code = 1000+user_id;
                                  const q = "UPDATE users SET refer_code=? WHERE user_id=?";
                                  conn.query(q,[refer_code,user_id],(err,refer_result)=>{
                                      if(err) throw err;
                                      const q = "SELECT *FROM users WHERE user_id = ?";
                                      conn.query(q,[user_id],(err,resultUser)=>{
                                          if(err) throw err;
                                          res.send({
                                                  status: "success",
                                                  message: "",
                                                  data: resultUser[0]
                                          });
                                      })
                                  })
                          })
                      })
                  }
              })
          }
              
      }else{
           res.status(409).send({
              
                           status: "fail",
                           message: "Username already exists. Try another username",
                           data: {}
                      });
  
      }
      })
  }else{
      res.status(500).send({
          status: "fail",
          message: "Username is invalid",
          data: {}
     });
  }
}

