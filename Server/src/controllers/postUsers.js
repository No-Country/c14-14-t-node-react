const Users = require('../models/users.js')
const admin = require('../firebaseConfig.js')

const postUsers = async(req, res)=>{
    const response = req.headers.authorization.split(' ')[1]
    const firebaseToken = response;
    try{
        const decodedToken = await admin.auth().verifyIdToken(firebaseToken)
        const {uid, name, picture, email, email_verified} = decodedToken
        const user = await Users.findOne({where: {email: email}})
        if(user){
            res.status(200).json('El usuario ya está registrado.')
        }
        else{
            await Users.create({uid, name, picture, email, email_verified})
            return res.status(200).json({message: 'El usuario se registro correctamente...'})
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = postUsers;