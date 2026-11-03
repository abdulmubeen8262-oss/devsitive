import db from "../Model/index.js";
const {User} = db;



const userServices={
    getAllUsers: async () => {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },
  
    deleteUser:async (userid)=>{
        try{
            const deletedUser = await User.destroy({
                where :{id:userid}
            })
            return deletedUser
        }
        catch(error)
        {
            throw new Error ("Error Deleting user"+error.message);
        }
    }

}

export default userServices;