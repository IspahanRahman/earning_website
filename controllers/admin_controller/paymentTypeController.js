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

const payment_types = async(req,res) =>{
  try{
    const query = "SELECT *FROM payment_types";
    const payment_types = await queryAsyncWithoutValue(query);
    const itemsPerPage = 20;
    const page = parseInt(req.query.page) || 1;
    const { paginatedData, totalPages } = pagination(payment_types, page, itemsPerPage);
    return res.render('admin/payment_types/payment_types',{
      payment_types: paginatedData,
      totalPages: totalPages,
      req:req,
      page:page,
  })
    
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_type_add = async(req,res) => {
  try{
    return res.render('admin/payment_types/payment_type_add');
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_type_add_post = async(req,res) => {
  try{
    const {payment_type} = req.body;
    const query = "INSERT INTO payment_types (payment_type)VALUES(?)";
    const type = await queryAsync(query,payment_type);
    if(type){
      return res.redirect("/admin/payment_types");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_type_update = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "SELECT *FROM payment_types WHERE id = ?";
    const paymentTypeInfo = await queryAsync(q,id);
    if(paymentTypeInfo.length==0){
      return res.status(409).json({message:"Data not found"});
    }else{
      return res.render('admin/payment_types/payment_type_update',{
        paymentTypeInfo: paymentTypeInfo,
      });
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_type_update_post = async(req,res)=>{
  try{
    const {payment_type,id} = req.body;
    const query = "UPDATE payment_types SET payment_type=? WHERE id=?";
    const values = [payment_type,id];
    const typeInfo = await queryAsync(query,values);
    if(typeInfo){
      return res.redirect("/admin/payment_types");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const payment_type_delete = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "DELETE FROM payment_types WHERE id=?";
    conn.query(q,[id],(err,result) =>{
        if(err) throw err;
        res.redirect(`/admin/payment_types`);
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports={
  payment_types,
  payment_type_add,
  payment_type_add_post,
  payment_type_update,
  payment_type_update_post,
  payment_type_delete
}
