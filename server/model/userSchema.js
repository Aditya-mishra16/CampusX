const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email']
    },
    phone:{
        type:Number,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password:{
        type:String,
        required: true,
        minlength: 8
    },
    cpassword:{
        type:String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            lname:{
                type:String,
                required: true
            },
            email:{
                type:String,
                required: true
            },
            message:{
                type:String,
                required: true
            }
    }
    ],
    tokens:[
        {
            token:{
                type:String,
                required: true
            }
        }
    ]

})

//We are hasing the password

userSchema.pre('save', async function(next){
if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
}
next();
});

//We are generating Auth Token

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }catch(err){
    console.log(err);
    }
}

//stored the message

userSchema.methods.addMessage = async function (name, lname, email, message) {
    try {
        // Validate input data (e.g., check if required fields are provided)

        // Add the new message to the messages array
        this.messages = this.messages.concat({ name, lname, email, message });

        // Save the updated user document
        await this.save();

        // Return the updated list of messages
        return this.messages;
    } catch (error) {
        // Handle errors gracefully
        console.log(error);
        throw new Error('Failed to add message'); // Example of error handling
    }
}


const User = mongoose.model('USER',userSchema);

module.exports = User;