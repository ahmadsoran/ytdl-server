import Messages from "../../../model/MessageSchema.js";

const BugReport = async (req, res) => {
    const { username, message } = req.body;
    try {
        const newMessage = new Messages({
            username,
            message
        });
        await newMessage.save();
        res.status(200).json({
            message: "Bug report sent successfully"
        });
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export default { BugReport };