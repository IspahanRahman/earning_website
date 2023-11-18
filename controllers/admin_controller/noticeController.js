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

const notice = async(req,res) =>{
  try{
    const query = "SELECT *FROM notice";
    const notice = await queryAsyncWithoutValue(query);
    const itemsPerPage = 20;
    const page = parseInt(req.query.page) || 1;
    const { paginatedData, totalPages } = pagination(notice, page, itemsPerPage);
    return res.render('admin/notice/notice',{
      notice: paginatedData,
      totalPages: totalPages,
      req:req,
      page:page,
  })
    
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const notice_add = async(req,res) => {
  try{
    return res.render('admin/notice/notice_add');
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const notice_add_post = async(req,res) => {
  try{
    const {notice} = req.body;
    const query = "INSERT INTO notice (notice) VALUES(?)";
    const noticeDetails = await queryAsync(query,notice);
    if(noticeDetails){
      return res.redirect("/admin/notice");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const notice_update = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "SELECT *FROM notice WHERE notice_id = ?";
    const notice = await queryAsync(q,id);
    if(notice.length==0){
      return res.status(409).json({message:"Data not found"});
    }else{
      return res.render('admin/notice/notice_update',{
        notice: notice,
      });
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const notice_update_post = async(req,res)=>{
  try{
    const {notice,id} = req.body;
    const query = "UPDATE notice SET notice=? WHERE notice_id=?";
    const values = [notice,id];
    const noticeInfo = await queryAsync(query,values);
    if(noticeInfo){
      return res.redirect("/admin/notice");
    }
    else{
      return res.status(500).json({message:"Something went wrong"});
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const notice_delete = async(req,res)=>{
  try{
    const {id} = req.query;
    const q = "DELETE FROM notice WHERE notice_id=?";
    conn.query(q,[id],(err,result) =>{
        if(err) throw err;
        res.redirect(`/admin/notice`);
    })

  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


module.exports={
  notice,
  notice_add,
  notice_add_post,
  notice_update,
  notice_update_post,
  notice_delete
}
