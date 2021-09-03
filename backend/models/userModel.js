const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    ad: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,

    },
    soyad: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
    kullaniciAdi: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 4,
        maxlength: 25,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 7,
        maxlength: 50,
        lowercase: true,
    },
    sifre: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 30,
    }

}, { collection: 'kullanicilar', timestamps:true });


const schema = Joi.object({
    ad: Joi.string().min(3).max(20).trim(),
    soyad: Joi.string().min(2).max(20).trim(),
    kullaniciAdi: Joi.string().min(4).max(25).trim(),
    email: Joi.string().min(7).max(50).trim().email(),
    sifre: Joi.string().min(6).max(30).trim()
});

UserSchema.methods.joiValidation= function(userObject){

    schema.required();
    return schema.validate(userObject);
}

UserSchema.statics.joiValidationForUpdate= function(userObject){

    return schema.validate(userObject);
}

UserSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user._id;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;
    delete user.sifre;

    return user;
}
const User = mongoose.model('User', UserSchema)

module.exports = User