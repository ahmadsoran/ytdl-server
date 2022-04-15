import User from "../../../model/UserSchema.js";
import UsersValidation from "./usersValidation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
const userRegister = async (req, res) => {
    const { username, password, email, firstName, phoneNumber } = req.body;
    try {
        try {
            await UsersValidation.validateAsync({ username, password, email, firstName, phoneNumber });

        } catch (error) {
            console.log({ username, password, email, firstName, phoneNumber });

            return res.status(400).json({ error: error.message });
        }
        console.log({ username, password, email, firstName, phoneNumber });

        const salt = await bcrypt.genSalt(14);
        const passwordEncrypt = bcrypt.hashSync(password, salt);

        const createUser = await new User({
            username,
            password: passwordEncrypt,
            email,
            firstName,
            phoneNumber
        });
        await createUser.save();
        return res.status(201).json({ message: "You have registerd successfully" });


    } catch (error) {
        console.log(error.message);
        if (error.message.includes("duplicate key error")) {
            return res.status(400).json({ error: 'username allready exists' });
        } else {
            return res.status(400).json({ error: error.message });
        }

    }


}

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne().where('username').equals(username);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const token = jwt.sign(
            {
                id: user._id,
            }
            , process.env.PRV_KEY, {
            algorithm: "HS512",

            // expiresIn: "1h"
        })
        bcrypt.compare(password, user.password, (err, result) => {

            if (result) {
                console.log('ok');


                res.setHeader('authorization', token);

                return res.status(200).json(token);
            } else {
                return res.status(400).json({ error: "Password is incorrect" });
            }

        });



    } catch (error) {
        console.log(error.message);

        return res.status(400).json({ error: error });

    }
}

const userUploadImages = async (req, res) => {
    const userId = req.headers.authorization;
    if (!req.file) {
        console.log('no file');
        return res.status(400).json({ error: "no image attached" })
    }


    try {
        jwt.verify(userId, process.env.PRV_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "invalid token" })
            }
            User.findByIdAndUpdate(decoded.id).then(async (user) => {


                const uplodedImg = await cloudinary.v2.uploader.upload(req.file.path, {
                    allowed_formats: ["jpg", "png", "jpeg", "webp", "HEIC", "AVIF"],
                    quality: 40,
                    folder: "ytdl-profile-image",
                    public_id: user.username,
                    faces: true,
                    overwrite: true,
                    transformation: [{
                        width: 300,
                        crop: "fit",
                    }],

                })
                const imgURL = uplodedImg.url
                user.image = imgURL
                await user.save();
                return res.status(200).json({ message: "image uploaded successfully" });

            }).catch(err => {
                console.log(err);
                return res.status(400).json({ error: err })
            })

        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: "invalid token" })
    }

}

const getUserData = async (req, res) => {
    const userId = req.headers.authorization;

    try {
        jwt.verify(userId, process.env.PRV_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "invalid token" })
            }
            User.findById(decoded.id).then(async (user) => {
                return res.status(200).json({
                    username: user.username, email: user.email, name: user.firstName, phone: user.phoneNumber,
                    img: user.image, role: user.role
                });
            }).catch(err => {
                console.log(err);
                return res.status(404).json({ error: 'user id not found' })
            })

        })

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }

}
export default { userRegister, userLogin, userUploadImages, getUserData };