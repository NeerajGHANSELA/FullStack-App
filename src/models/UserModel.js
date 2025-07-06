import mongoose from 'mongoose';

const { Schema } = mongoose;
const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

const UserSchema = new Schema ({
    ClerkID: {
        type: String,
        required: [ true, 'ClerkId is required for the user.' ],
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: [ true, 'Username is required!' ],  // username is required else throw an error
        trim: true, // get rid of any whitespaces at the front or the end
        minlength: 4,
        unique: true,   // every user must have a unique username.
    },
    email: {
        type: String,
        required: [ true, 'Email is required!' ],
        trim: true,
        unique: true,   // email must be unique
        lowercase: true, // email will be transformed into lowercase since it is case-insensitive.
        match: [ emailRegex, 'please use a valid email address.' ], // email must match the regex given above or else throw an error.
    }, 
    fullname: {
        type: String,
        required: [ true, 'Full name is required'],
        trim: true,
    },
    isVerified: {
        type: Boolean,
        required: [ true, 'Please make sure the user is verified.' ]
    },
});

// check if the User model already exists. If not create one.
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
