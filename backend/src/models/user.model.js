import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 20,
    },

    verified: {
        type: String,
        default: false
    }
}, {
    timestamps: true
});

/**
 * Mongoose pre-save middleware used to hash a user's password before saving it to the database.
    if (!this.isModified('password')) return;
 * If user has updated only their name only name should be updated not the hashed password because hashed password will be hashed again if not written 
    
 */
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});


//This is a custom method added to our Mongoose UserSchema for comparing plain-text passsword with the hashed password stored in our DB
userSchema.methods.comparePasssword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}



const userModel = mongoose.model('user', userSchema);
export default userModel; 