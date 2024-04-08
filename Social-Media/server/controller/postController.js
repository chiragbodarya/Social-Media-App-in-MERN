const Post = require('../model/postModel');
const User = require('../model/userModel');





const uploadPost = async (req, res) => {
    // console.log('api is colling')
    try {
        const { aboutpost } = req.body;
        // console.log('aboutpost', aboutpost);
        const postImage = req.file.path;
        // console.log('postImage', postImage)

        const user = req.user.user.id;
        // console.log('user', user)

        const post = await Post.create({
            aboutpost,
            postImage,
            user
        });

        // console.log('post', post)
        res.status(200).json({ message: 'post successfuly upload', post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};






const getAllPosts = async (req, res) => {
    // console.log('api is called')
    const { id } = req.params;
    // console.log(id)
    try {
        const userPosts = await Post.find({ user: id })
            .populate('user', ['name', 'postImage']).sort({ date: -1 });
        if (!userPosts) return res.status(400).json({ msg: "No User found" });
        res.status(200).json({ message: "App Post Find SuccessFuly", userPosts });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}






// const deletePost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         await Post.findByIdAndDelete(postId);
//         res.json({ message: 'Post deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete post', error: error.message });
//     }
// };






const likePost = async (req, res) => {
    console.log('like post is called')
    try {
        const postId = req.params.id;
        const userId = req.user.user.id;
        console.log("postId", postId)
        console.log("userId", userId)
        const post = await Post.findById(postId);
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
        }
        res.json({ message: 'Post liked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to like post', error: error.message });
    }
};


const unLikePost = async (req, res) => {
    console.log("api is called")
}






// const commentPost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const { text } = req.body;
//         const userId = req.user.id; // Assuming you have user authentication middleware
//         const post = await Post.findById(postId);
//         post.comments.push({ text, user: userId });
//         await post.save();
//         res.status(201).json({ message: 'Comment added successfully', post });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to comment on post', error: error.message });
//     }
// };

// const replyToComment = async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const commentId = req.params.commentId;
//         const { text } = req.body;
//         const userId = req.user.id; // Assuming you have user authentication middleware
//         const post = await Post.findById(postId);
//         const comment = post.comments.find(comment => comment._id == commentId);
//         comment.replies.push({ text, user: userId });
//         await post.save();
//         res.status(201).json({ message: 'Reply added successfully', post });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to reply to comment', error: error.message });
//     }
// };


module.exports = {
    uploadPost,
    getAllPosts,
    // deletePost,
    likePost,
    unLikePost,
    // commentPost,
    // replyToComment
};