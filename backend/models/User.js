const mongoose = require("mongoose")
const {Schema} = mongoose

// schema => usado para definir a estrutura dos documentos que serão armazenados no banco de dados.

//user model
const userSchema = new Schema(
    {
        name:String,
        email: String,
        password: String,
        profileImage: String,
        bio: String,
    },
    {
        timestamps: true,
        //add automaticamente "createdAt" e "updatedAT" p cada doc criado => registrarao as datas e horarios da criacao
    }

);

const User = mongoose.model("User", userSchema)

module.exports = User;