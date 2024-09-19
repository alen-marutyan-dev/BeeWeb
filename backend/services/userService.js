const {UserModel} = require('../models');

class UserService {
    creatUser(data) {
        return UserModel.create({...data});
    }

    getUser(id) {
        return UserModel.findById(id).select('-password');
    }

    updateUser(id, data) {
        return UserModel.findByIdAndUpdate(id, {...data}, {new: true});
    }

    deleteUser(id) {
        return UserModel.findByIdAndDelete(id);
    }

    getUserByEmail(email) {
        return UserModel.findOne({email})
    }
}

module.exports = new UserService();