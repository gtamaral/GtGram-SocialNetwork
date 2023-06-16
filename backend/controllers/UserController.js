const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {default: mongoose} = require("mongoose");  //obs aqui

const jwtSecret = process.env.JWT_SECRET;

// generate user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d",
    });
}

// Register user and sign in 
const register = async (req, res) => {

    const {name, email, password} = req.body;
    
    //check if user exists
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["por favor, utilize outro email"]})
    }

    // generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    //if user was created sucessfully, return the token
    if(!newUser) {
        res.status(422).json({errors: ["houve um erro, por favor tente mais tarde."],});
        return; //mexi aqui 12h09 sex
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),

    });
};

// sign user in
const login = async (req, res) => {

    const {name, email, password} = req.body;

    const user = await User.findOne({ email });


    // check if user exists
    if(!user || !user.password) {
        res.status(404).json({ errors: ["usuario não encontrado."] });
        return;
    }

    //check if password matches
    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["senha invalida."] });
        return;
    }
    
    //return user with token
    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
}

//get current logged in user
const getCurrentUser = async(req, res) => {
    const user = req.user

    res.status(200).json(user);
};

// update an user
const update = async(req,res) => {
    
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    //const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")
    //const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");
    const user = await User.findById(reqUser._id).select("-password");


    if(name) {
        user.name = name
    }
    if(password) {
        // generate password hash
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash

    }

    if(profileImage) {
        user.profileImage = profileImage
    }

    if(bio) {
        user.bio = bio
    }

    await user.save()

    res.status(200).json(user);

};

// get user by id
const getUserById = async(req, res) => {

    const {id} = req.params

    try {
        
        const user = await User.findById( new mongoose.Types.ObjectId(id)).select("-password")
        //const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")
            //chech if user exists

        if(!user) {
            res.status(404).json({errors: ["Usuário não existe."]})
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
        res.status(404).json({errors: ["usuário não encontrado."]})
        return;
    }
    //chech if user exists
    
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};