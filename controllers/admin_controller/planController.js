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

const plan_list = async(req,res) =>{
  try{
    const query = "SELECT *FROM plan";
    const plans = await queryAsyncWithoutValue(query);
    const itemsPerPage = 20;
    const page = parseInt(req.query.page) || 1;
    const { paginatedData, totalPages } = pagination(plans, page, itemsPerPage);
    return res.render('admin/plan/plan_list',{
      plans: paginatedData,
      totalPages: totalPages,
      req:req,
      page:page,
  })
    
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const plan_add = async(req,res) => {
  try{
    return res.render('admin/plan/plan_add');
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const plan_add_post = async(req,res) => {
  try{
    const {name,price,description} = req.body;
    const query = "INSERT INTO plan (plan_name,price,description)VALUES(?,?,?)";
    const values = [name,price,description];
    const planInfo = await queryAsync(query,values);
    if(planInfo){
      return res.redirect("/admin/plan_list");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const plan_update = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "SELECT *FROM plan WHERE plan_id = ?";
    const planInfo = await queryAsync(q,id);
    if(planInfo.length==0){
      return res.status(409).json({message:"Data not found"});
    }else{
      return res.render('admin/plan/plan_update',{
        planInfo: planInfo,
      });
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const plan_update_post = async(req,res)=>{
  try{
    const {name,price,description,id} = req.body;
    const query = "UPDATE plan SET plan_name=? , price= ? , description = ? WHERE plan_id=?";
    const values = [name,price,description,id];
    const planInfo = await queryAsync(query,values);
    if(planInfo){
      return res.redirect("/admin/plan_list");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const plan_delete = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "DELETE FROM plan WHERE plan_id=?";
    conn.query(q,[id],(err,result) =>{
        if(err) throw err;
        res.redirect(`/admin/plan_list`);
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports ={
  plan_list,
  plan_add,
  plan_add_post,
  plan_update,
  plan_update_post,
  plan_delete
}