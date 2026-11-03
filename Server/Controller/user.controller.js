import userServices from "../Services/user.service.js";

const userController = {
    getAllUser: (req, res) => {

        const users = UserService.getAllUsers();
        res.status(200).json(users);

    },

    deleteUser: (req, res) => {
        const userid = req.params.id;
        try {
            const response = UserService.deleteUser(userid);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json("Error Deleting User" + error.message)
        }

    }
}

export default userController;