const User = require('../model/userModel');

const searchUserProfile = async (req, res) => {
    console.log('searchUserProfile api is called')
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }
        const users = await User.find({
            $or: [
                { firstName: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } },
            ]
        });
        res.json(users);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { searchUserProfile };