const conn = require('../../config/database');
const pagination = require('../../middlewares/pagination');
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

const payment_methods = async(req,res) =>{
  try{
    const query = "SELECT *FROM payment_method";
    const payment_methods = await queryAsyncWithoutValue(query);
    const itemsPerPage = 20;
    const page = parseInt(req.query.page) || 1;
    const { paginatedData, totalPages } = pagination(payment_methods, page, itemsPerPage);
    return res.render('admin/payment_method/payment_methods',{
      payment_methods: paginatedData,
      totalPages: totalPages,
      req:req,
      page:page,
  })
    
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_method_add = async(req,res) => {
  try{
    return res.render('admin/payment_method/payment_method_add');
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_method_add_post = async(req,res) => {
  try{
    const {method,number} = req.body;
    const query = "INSERT INTO payment_method (method,number)VALUES(?,?)";
    const values = [method,number];
    const payment_method = await queryAsync(query,values);
    if(payment_method){
      return res.redirect("/admin/payment_methods");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_method_update = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "SELECT *FROM payment_method WHERE id = ?";
    const paymentMethodInfo = await queryAsync(q,id);
    if(paymentMethodInfo.length==0){
      return res.status(409).json({message:"Data not found"});
    }else{
      return res.render('admin/payment_method/payment_method_update',{
        paymentMethodInfo: paymentMethodInfo,
      });
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_method_update_post = async(req,res)=>{
  try{
    const {method,number,id} = req.body;
    const query = "UPDATE payment_method SET method=? , number= ?  WHERE id=?";
    const values = [method,number,id];
    const methodInfo = await queryAsync(query,values);
    if(methodInfo){
      return res.redirect("/admin/payment_methods");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_method_delete = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "DELETE FROM payment_method WHERE id=?";
    conn.query(q,[id],(err,result) =>{
        if(err) throw err;
        res.redirect(`/admin/payment_methods`);
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports={
  payment_methods,
  payment_method_add,
  payment_method_add_post,
  payment_method_update,
  payment_method_update_post,
  payment_method_delete
}
