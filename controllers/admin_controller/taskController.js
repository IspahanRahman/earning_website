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

const tasks = async(req,res)=>{
  try{
    const {id} = req.query;
    const q ="SELECT *FROM plan WHERE plan_id=?";
    const plan = await queryAsync(q,id);
    if(plan.length==0){
      return res.status(500).json({message:"Something went wrong"});
    }
    else{
      const q ="SELECT *FROM task WHERE plan_id=?";
      const task = await queryAsync(q,id);
      return res.render('admin/task/tasks',{
        plan:plan,
        task:task
      });
    }
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

const task_add_post = async (req, res) =>{
  try{
    const {id} = req.body;
    let tasks = [];
    for (let i = 0; i < req.body.task_description.length; i++) {
      const task = {
        plan_id: id,
        task_description: req.body.task_description[i],
        task_title: req.body.task_title[i],
        time: req.body.time[i],
        price: req.body.price[i],
      };
      tasks.push(task)
      console.log(tasks);
  }

  const q = 'INSERT INTO task (plan_id, task_description,task_title,time, price) VALUES ?';
  const values = tasks.map(item => [item.plan_id, item.task_description,item.task_title,item.time,item.price]);
  console.log(values);
  conn.query(q,[values],(err,result)=>{
    if(err) throw err;
    res.redirect('/admin/plan_list');
  })
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}


const task_delete = async(req,res)=>{
  try{
    const {id} = req.query;
    const q =" SELECT *FROM task WHERE task_id=?";
    conn.query(q,[id],(err,task_result)=>{
      if(err) throw err;
      const q = "DELETE FROM task WHERE task_id=?";
      conn.query(q,[id],(err,result) =>{
          if(err) throw err;
          res.redirect(`/admin/tasks?id=${task_result[0].plan_id}`);
      })
    })
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

module.exports = {
  tasks,
  task_add_post,
  task_delete
}