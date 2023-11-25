const conn = require("../../config/database");
const Flash = require("../../utils/Flash");
const bcrypt = require("bcrypt");
let regMessage;
let loginMessage;

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

const registerPage = async (req, res) => {
  try {
    return res.render(
      "api/signUp",
      { login_status: req.login_status, regMessage: regMessage },
      (regMessage = null)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginPage = async (req, res) => {
  try {
    return res.render(
      "api/login",
      { login_status: req.login_status, loginMessage: loginMessage },
      (loginMessage = null)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const q = "SELECT *FROM users WHERE mobile=?";
    // const values = [mobile, password];
    const userInfo = await queryAsync(q, mobile);
    if (Object.keys(userInfo).length == 0) {
      loginMessage = "Wrong mobile or password";
      return res.redirect("/api/loginPage");
    } else {
      bcrypt.compare(password, userInfo[0].password).then(async (isValidPassword) => {
        if (isValidPassword) {
          res.cookie("userId", userInfo);
          login_status = true;
          const query = "SELECT * FROM notice";
          const notices = await queryAsyncWithoutValue(query);
          return res.render(
            "api/index",
            {
              login_status: req.login_status,
              loginMessage: loginMessage,
              userInfo:userInfo,
              notices:notices
            },
            (loginMessage = null)
          );
        } else {
          loginMessage = "Wrong mobile or password";
          return res.redirect("/api/loginPage");
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, mobile, password, confirm_pass, referer_code } = req.body;

    if (password == confirm_pass) {
      if (referer_code == "") {
        let newHashedPassword = await bcrypt.hash(password, 10);
        const insertData =
          "INSERT INTO users(name,mobile,password, referer_code)VALUES(?,?,?,?)";
        const values = [name, mobile, newHashedPassword, "1234"];
        const userInfo = await queryAsync(insertData, values);
        if (userInfo) {
          const q = "SELECT LAST_INSERT_ID() as id";
          const user = await queryAsyncWithoutValue(q);
          console.log(user);
          const user_id = user[0].id;
          console.log(user_id);
          const refer_code = 1000 + user_id;
          console.log(refer_code);
          const q1 = "UPDATE users SET refer_code=? WHERE user_id=?";
          conn.query(q1, [refer_code, user_id], (err, result) => {
            if (err) {
              regMessage = "Some went wrong";
              return res.redirect("/api/registerPage");
            }
            return res.redirect("/api/loginPage");
          });
        } else {
          regMessage = "Some went wrong";
          return res.redirect("/api/registerPage");
        }
      } else {
        const q = "SELECT *FROM users WHERE refer_code=?";
        const result = await queryAsync(q, referer_code);
        if (Object.keys(result).length == 0) {
          regMessage = "Refer code does not exist";
          return res.redirect("/api/registerPage");
        } else {
          let newHashedPassword = await bcrypt.hash(password, 10);
          const insertData =
            "INSERT INTO users(name,mobile,password, referer_code)VALUES(?,?,?,?)";
          const values = [name, mobile, newHashedPassword, referer_code];
          const userInfo = await queryAsync(insertData, values);
          if (userInfo) {
            const q = "SELECT LAST_INSERT_ID() as id";
            const user = await queryAsyncWithoutValue(q);
            const user_id = user[0].id;
            const refer_code = 1000 + user_id;
            const q1 = "UPDATE users SET refer_code=? WHERE user_id=?";
            conn.query(q1, [refer_code, user_id], (err, result) => {
              if (err) {
                regMessage = "Some went wrong";
                return res.redirect("/api/registerPage");
              }
              return res.redirect("/api/loginPage");
            });
          } else {
            regMessage = "Some went wrong";
            return res.redirect("/api/registerPage");
          }
        }
      }
    } else {
      regMessage = "Password not matched";
      return res.redirect("/api/registerPage");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logOut = (req, res) => {
  try{
    res.clearCookie("userId");
    req.login_status = false;
    res.redirect("/api/loginPage");
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
};

const profile = async(req,res) =>{
  try{
    const {id} = req.query;
    const q = "SELECT * FROM users WHERE user_id=?";
    const profile = await queryAsync(q,id);
    if(profile.length!=0){
      return res.render('api/profile',{
        login_status: req.login_status,
        profile:profile
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

const homePage = async(req,res)=>{
  try{
    const user = req.userId;
    const user_id =user[0].user_id;
    const query = "SELECT * FROM users WHERE user_id=?";
    const userInfo = await queryAsync(query,user_id);
    if(userInfo.length!=0){
      const query1 = "SELECT * FROM notice";
      const notices = await queryAsyncWithoutValue(query1);
      return res.render('api/index',{
        login_status: req.login_status,
        loginMessage: loginMessage,
        userInfo:userInfo,
        notices:notices
      },
      (loginMessage = null)
      )
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports = {
  registerPage,
  addUser,
  loginPage,
  login,
  logOut,
  profile,
  homePage
};
