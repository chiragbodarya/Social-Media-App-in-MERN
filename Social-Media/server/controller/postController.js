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






const deletePost = async (req, res) => {
    console.log('delete api is called')
    try {
        const postId = req.params.id;
        const userId = req.user.user.id;
        // console.log("postId", postId)
        // console.log("userId", userId)
        const post = await Post.findById(postId)
        if (post) {
            // console.log("post user id", post.user)
            // console.log('post', post)
            if (post.user == userId) {
                await Post.findByIdAndDelete(postId);
                res.status(200).json({ message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ error: "you can not delete this post " })
            }
        } else {
            res.status(401).json({ error: "this post is already deleted plase wait" })
        }
    } catch (error) {
        res.status(500).json({ error: 'server error', error: error.message });
    }
};







const CheckLikePostStatus = async (req, res) => {
    // console.log("CheckLikePostStatus api is called")
    try {
        const postId = req.params.id;
        const userId = req.user.user.id;
        // console.log("postId", postId)
        // console.log("userId", userId)

        const post = await Post.findById(postId)
        const isLike = post.likes.includes(userId)
        res.json({ isLike })
        // console.log('post', post)
    } catch (error) {
        console.log("Error : ", error)
    }
}






const likePost = async (req, res) => {
    // console.log('like post is called')
    try {
        const postId = req.params.id;
        const userId = req.user.user.id;
        // console.log("postId", postId)
        // console.log("userId", userId)
        const post = await Post.findById(postId);
        const alreadyLikePostUser = post.likes.includes(userId)
        // console.log("kadnsijnedfovnedon--------", alreadyLikePostUser)
        if (!alreadyLikePostUser) {
            post.likes.push(userId);
            await post.save();
            const checkUSerAlreadyLikePost = post.likes.includes(userId)
            res.json({ message: 'Post liked successfully', checkUSerAlreadyLikePost });
        } else {
            const checkUSerAlreadyLikePost = post.likes.includes(userId)
            res.json({ message: "user already like this post", checkUSerAlreadyLikePost })
        }
        // console.log("post", post)
    } catch (error) {
        res.status(500).json({ message: 'Failed to like post', error: error });
        console.log("error", error)
    }
};





const unLikePost = async (req, res) => {
    // console.log("Un Like api is called")
    try {
        const postId = req.params.id;
        const userId = req.user.user.id;
        // console.log("postId", postId)
        // console.log("userId", userId)
        const post = await Post.findById(postId);
        const alreadyunLikePostUser = post.likes.includes(userId)
        // console.log("kadnsijnedfovnedon--------", alreadyunLikePostUser)
        if (alreadyunLikePostUser) {
            post.likes.pop(userId);
            await post.save();
            const checkUSerAlreadyunLikePost = post.likes.includes(userId)
            res.json({ message: 'Post unliked successfully', checkUSerAlreadyunLikePost });
        } else {
            const checkUSerAlreadyunLikePost = post.likes.includes(userId)
            res.json({ message: "user already unlike this post", checkUSerAlreadyunLikePost })
        }
        // console.log("post", post)
    } catch (error) {
        res.status(500).json({ message: 'Failed to Unlike post', error: error });
        console.log("error", error)
    }
}




const getAllComment = async (req, res) => {
    console.log("getallcomment api is called")
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const finalPost = await Post.findById(postId).populate('comments.user').populate(
            'comments.replies.user'
        );

        res.json({ finalPost })
    } catch (error) {
        console.log("Error fetching comments: ", error);
        res.status(500).json({ message: "Server error" });
    }
};



const commentPost = async (req, res) => {
    // console.log("comment api is called")
    try {
        const postId = req.params.id;
        const { text } = req.body;
        const userId = req.user.user.id;
        // console.log("postId", postId)
        // console.log("text", text)
        // console.log("userId", userId)
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(401).json({ error: "Post not found" });
        }
        post.comments.push({ text, user: userId });
        await post.save();
        const updatedPost = await Post.findById(postId).populate('comments.user');
        res.status(200).json({ message: 'Comment added successfully', post: updatedPost })
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: 'Failed to comment on post', error: error.message });
    }
};





const replyToComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { text } = req.body;
        const userId = req.user.user.id;
        console.log("PostId", postId)
        console.log("commentId", commentId)
        console.log("text", text)
        console.log("userId", userId)

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = post.comments.find(comment => comment._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const reply = { text, user: user._id };
        comment.replies.push(reply);
        await post.save();

        const updatedPost = await Post.findById(postId).populate({
            path: 'comments',
            populate: {
                path: 'replies.user'
            }
        });

        res.status(200).json({ message: 'Reply added successfully', post: updatedPost });
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ error: 'Failed to add reply to comment', errorMessage: error.message });
    }
};




const likeComment = async (req, res) => {
    console.log("like comment api is called")
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.find(c => c._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.likes.includes(userId)) {
            return res.status(400).json({ message: "You have already liked this comment" });
        }

        comment.likes.push(userId);
        await post.save();

        res.json({ message: "Comment liked successfully", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};





const unLikeComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.find(c => c._id.toString() === commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (!comment.likes.includes(userId)) {
            return res.status(400).json({ message: "You have not liked this comment yet" });
        }

        comment.likes = comment.likes.filter(id => id !== userId);
        await post.save();

        res.json({ message: "Comment unliked successfully", post });
    } catch (error) {
        console.log("Error : ", error)
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = {
    uploadPost,
    getAllPosts,
    deletePost,
    CheckLikePostStatus,
    likePost,
    unLikePost,
    getAllComment,
    commentPost,
    replyToComment,
    likeComment,
    unLikeComment
};