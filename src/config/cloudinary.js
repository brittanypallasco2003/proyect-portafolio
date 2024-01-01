//importar cloudinary
const cloudinary = require('cloudinary').v2

//Realizar las configuraciones
cloudinary.config({ 
    //establecer las variables de entorno
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

//Función para guardar las imagenes en cloudinary 
module.exports.uploadImage = async(filePath) => {
    //Guardar en cloudinary en la carpeta portafolio (en cloudinary)
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}

//Método para eliminar las imagenes del cloudinary
module.exports.deleteImage = async (publicId)=>{
    //eliminar en cluodinary de la carpeta portafolio
    return await cloudinary.uploader.destroy(publicId)
}