const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({})
    res.setHeader("X-name","vikas");
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({err:"user not found"})
    }
    return res.json(user);
}

async function handleIUpdateUserById(req, res){
    await User.findByIdAndUpdate(req.params.id,{
        lastName: "Changed"
    });
    return res.json({status:"Success"});
}

async function handleDeleteUserById(req,res){
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(404).json({err:"user not found"})
    }
    return res.json({deleted:user});

}

async function handleCreateUser(req,res){
    const body=req.body;

    if(!body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender){
        return res.status(400).json({msg:"All fields are requierd"})
    }
    // users.push({...body, id:users.length+1});
    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.json({status:"Success",id:users.length});
    // });

   const result = await User.create({
    fistName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    // jobTitle:body.jobTitle
   }); 
   console.log(result);
   return res.status(201).json({msg:`"user created ${res.id}"`,});
}

module.exports = { 
    handleGetAllUsers,
    handleGetUserById,
    handleIUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}