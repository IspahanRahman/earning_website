let login_status = false;

const checkLogin = (req, res, next) => {
  const token = req.cookies.userId;
  console.log("this is token",token)

  if (token) {
    req.userId = token;
    req.login_status = true;
    return next();
  } else {
   return res.redirect('/api/loginPage');
  }
};

module.exports = checkLogin;