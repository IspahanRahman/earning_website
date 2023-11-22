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

const refer_settings = async(req,res) =>{
  try{
    const query = "SELECT *FROM refer_settings";
    const settings = await queryAsyncWithoutValue(query);
    const itemsPerPage = 20;
    const page = parseInt(req.query.page) || 1;
    const { paginatedData, totalPages } = pagination(settings, page, itemsPerPage);
    return res.render('admin/refer_setting/refer_setting',{
      settings: paginatedData,
      totalPages: totalPages,
      req:req,
      page:page,
  })
    
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const refer_setting_add = async(req,res) => {
  try{
    return res.render('admin/refer_setting/refer_setting_add');
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const refer_setting_add_post = async(req,res) => {
  try{
    const {percent} = req.body;
    const query = "INSERT INTO refer_settings (amount_percent) VALUES(?)";
    const settings = await queryAsync(query,percent);
    if(settings){
      return res.redirect("/admin/refer_settings");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const refer_setting_update = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "SELECT *FROM refer_settings WHERE id = ?";
    const settings = await queryAsync(q,id);
    if(settings.length==0){
      return res.status(409).json({message:"Data not found"});
    }else{
      return res.render('admin/refer_setting/refer_setting_update',{
        settings: settings,
      });
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const refer_setting_update_post = async(req,res)=>{
  try{
    const {percent,id} = req.body;
    const query = "UPDATE refer_settings SET amount_percent=? WHERE id=?";
    const values = [percent,id];
    const settings = await queryAsync(query,values);
    if(settings){
      return res.redirect("/admin/refer_settings");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const refer_setting_delete = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "DELETE FROM refer_settings WHERE id=?";
    conn.query(q,[id],(err,result) =>{
        if(err) throw err;
        res.redirect(`/admin/refer_settings`);
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports={
  refer_settings,
  refer_setting_add,
  refer_setting_add_post,
  refer_setting_update,
  refer_setting_update_post,
  refer_setting_delete
}
