"use strict";
//en este archivo debe ir el schema del modelo de datos del usuarios,
//es decir qué tipo de datos guardaremos de los usuarios//
// //export interface IUser extends Document {
//     email: string;
//     password: string
// }
// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("users", {
//       username: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       password: {
//         type: Sequelize.STRING
//       }
//     });
//     return User;
//   };
//para encriptar la contraseña antes de guardarla:
/*
 userSchema.pre('save', function(){
    const user = this;
    //antes de guardar comprobamos que el usario no exista previamente en la bd, de lo contrario continuara con el codigo.
    Esto se hace para no
    if (!user.isModified('password')) return next()

   const salt = await bcrypt.gensalt(10)
   const hash = await bcrypt.hash(user.password, salt)
   user.password = hash
   next()

 })
*/
//export default model <IUser>('User', userSchema)
