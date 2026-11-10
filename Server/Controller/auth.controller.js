import bcrypt from 'bcrypt';
import AuthService from '../Services/auth.service.js';

const authController = {

    // Controller to Register User
    registerUser: async (req, res) => {
        const userData = req.body;
        // Hash the password before creating the user
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        const newUser = await AuthService.registerUser(userData);
        res.status(201).json(newUser);

    },


    // Controller to Login User
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await AuthService.loginUser(email, password);
            res.status(200).json({ message: 'Login successful', user });
        }
        catch (error) {
            res.status(401).json({ message: error.message });
        }

    },


    updateProfile:async(req,res) =>{
        const userId = req.params.id;
        const updatedBody = req.body;
        try{
            const response  = await AuthService.updateProfile(userId,updatedBody)
            res.status(200).json ({message:"User Updated",response})
        }
        catch(error)
        {
            res.status(500).json({message:error.message})
        }
    }
}

export default authController;