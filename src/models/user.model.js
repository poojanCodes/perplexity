import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username cannot be empty'],
        unique: [true, 'Username must be unique'],
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email should not be empty'],
        unique: [true, 'Email should be unique'],
        lowercase: true
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: 3
    },

    vereified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


userSchema.pre('save',async function(){
    if(!this.isModified('password')) return ; 
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}


const userModel = mongoose.model('Users',userSchema);

export default userModel ; 