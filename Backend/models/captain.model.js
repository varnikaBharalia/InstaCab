import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captionSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [8, 'Plate Number must be at least 8 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorbike', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        long: {
            type: Number,
        }
    }
})


captionSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captionSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captionSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('Caption' , captionSchema);

export default captainModel;