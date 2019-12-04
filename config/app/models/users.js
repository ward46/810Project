const Bcrypt = require('bcryptjs');
let Mongoose = require('mongoose');
let Schema = Mongoose.Schema; 

let UserSchema = new Schema({
    firstName: String, 
    lastName: String, 
    active: Boolean, 
    email: String, 
    password: String, 
    dateRegistered: Date
})

UserSchema.pre('save', function (next) {
    var person = this;
    if (this.isModified('password') || this.isNew) { 
       Bcrypt.genSalt(10, function (err, salt) {
            if (err) { 
               return next(err); 
           }
            Bcrypt.hash(person.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                person.password = hash;
                next();
            });
        });
    } else { 
       return next();
    }
});
UserSchema.methods.comparePassword = function (passw, cb) {
    Bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
module.exports = Mongoose.model('User', UserSchema);
