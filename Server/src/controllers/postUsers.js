const Users = require('../models/users.js');

const postUsers = async(req, res)=>{
    const {uid, email, password} = req.body;
    try{
        const users = await Users.create({uid, email, password});
        res.status(200).json({message: users});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = postUsers;