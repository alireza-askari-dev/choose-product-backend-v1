const mongoose = require('mongoose');

// mrx : user schema Start --------------------------------------------------
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    phoneNumber: {
        type: String,
        // unique: true
    },
    userName: {
        type: String,
        // unique: true
    },
    email: {
        type: String,
    },
    registrationSt: {
        type: String,
    },
    Birthday: {
        type: String,
    },
    vCode: {
        type: Number,
    },
}, {
    timestamps: true,
})

// userSchema.pre('save', async function (error, doc, next) {
//     // encrypt password before saving to database
//     if (this.isModified('password'))
//         this.password = await bcrypt.hash(this.password, 8)
//     next()
// })

// mrx : End ----------------------------------------------------------------

module.exports = mongoose.model('User', userSchema)