import db from "../Model/index.js";
import bcrypt from 'bcrypt';
const { User } = db;

const sanitizedUser = (user) => {
    const { password, ...sanitizedUser } = user.toJSON();
    return sanitizedUser;
}

const authService = {

    // Service to Register User
    registerUser: async (userData) => {

        try {
            const newUser = await User.create(userData);
            console.log('New user created:', newUser);
            return newUser;
        }
        catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    // Service to Login User
    loginUser: async (email, password) => {

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid password');
            }
            const sanitized = sanitizedUser(user);
            console.log('User logged in:', sanitized);

            return sanitized;
        } catch (error) {
            throw new Error('Error during login: ' + error.message);
        }

    },

    // Update User Profile
    updateProfile: async (userid, updatedBody) => {
        try {
            const [updatedRows] = await User.update(updatedBody, {
                where: {
                    id: userid
                }
            });
            if (updatedRows === 0) {
                throw new Error("User not found or no changes made");
            }

            const updatedUser = await User.findByPk(userid);

            return sanitizedUser(updatedUser);

        } catch (error) {
            throw new Error("Error updating user: " + error.message)
        }

    }


}
export default authService;