import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// DATA SEMUA USER, KHUSUS ADMIN COY
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: users});
    } catch(error) {
        next(error);
    }
}

// DETAIL USER, JADI USER BISA PERIKSA DETAIL SENDIRI (CUMAN BISA AKSES DETAIL AKUN MASING MASING )
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;

        }
        res.status(200).json({success: true, data: user});
    } catch(error) {
        next(error);
    }
}

// UPDATE INFORMASI AKUN(KAYAK GANTI NAMA, EMAIL, PASSWORD, ETC.)
export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const {name, email, password} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User didn't exists");
            error.statusCode = 404;
            throw error;
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.status(200).json({success: true, message: 'Update User', data: user});
    } catch(error){
        next(error);
    }
}

// DELETE USER, LITERRALY DELET, HAPUS, GK USAH NANYA...
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({success: true, message: 'Delete User'});
    } catch(error) {
        next(error);
    }
}