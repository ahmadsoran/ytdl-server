import jwt from 'jsonwebtoken'
import Downloads from '../../../model/Downloads.js'
import User from '../../../model/UserSchema.js'

const userDownloads = async (req, res) => {
    const userId = req.headers.authorization;
    const { videoUrl, thumbnail, title } = req.body
    console.log(userId)
    try {
        jwt.verify(userId, process.env.PRV_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "invalid token" })
            }
            const FindUser = User.findById(decoded.id)
            const user = await FindUser.exec()
            if (!user) {
                return res.status(400).json({ error: "User not found" })
            }
            const download = new Downloads({
                videoUrl,
                thumbnail,
                title,
                userId: user._id,
                nameOfUser: user.firstName,
                userImage: user.image,
                userRole: user.role

            })

            await download.save()
            return res.status(200).json({ message: "Download saved" })

        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getUserDownloads = async (req, res) => {
    const userId = req.headers.authorization;

    try {
        jwt.verify(userId, process.env.PRV_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "invalid token" })
            }
            const FindUser = User.findById(decoded.id)
            const user = await FindUser.exec()
            if (!user) {
                return res.status(400).json({ error: "User not found" })
            }
            const downloads = await Downloads.find({ userId: user._id }).exec()
            return res.status(200).json({
                downloadsData: downloads,
                userData: {
                    name: user.firstName,
                    img: user.image,
                    role: user.role
                }

            })

        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllDownloads = async (req, res) => {
    try {
        const downloads = await Downloads.find().exec()
        return res.status(200).json({ downloads })



    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}
export default { userDownloads, getUserDownloads, getAllDownloads }