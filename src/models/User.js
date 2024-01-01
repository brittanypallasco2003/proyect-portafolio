//IMPORTACIÓN DE LIBRERÍAS
//importar el Shema y el Model
const {Schema, model} = require('mongoose')
//importar el bycript
const bcrypt = require('bcryptjs')

//CREAR SCHEMA USER
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    }
},{
    timestamps:true
})

//MÉTODO PARA CIFRAR EL PASSWORD DEL USUARIO
userSchema.methods.encrypPassword = async (password)=>{
    //estblecer los saltos para encriptar el password
    const salt = await bcrypt.genSalt(10)
    //encriptar el password
    const passwordEncryp = await bcrypt.hash(password,salt)
    //retornar el password encriptado
    return passwordEncryp
}

//MÉTODO PARA VERIFICAR SI EL PASSWORD INGRESADO ES EL MISMO DE LA BDD
userSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

//EXPORTAR EL MODELO Y EL ESQUEMA
module.exports = model('user',userSchema)