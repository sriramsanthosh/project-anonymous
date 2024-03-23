const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

module.exports.create = async (req, res) => {
    await Post.findById(req.body.currPostID).then(async (post) => {
        if (await post) {
            await Comment.create({
                content: await req.body.commentText,
                post: await post._id,
                user: await req.body.userData._id
            }).then(async (comment) => {
                await post.comments.push(comment);
                await post.save();
                let message = `🎉 Comment posted`;
                return res.status(200).send({
                    message: message
                });
            }).catch((err) => {
                let message = `Error ${err}, in posting comment`;
                return res.status(201).send({
                    message: message
                })
            });
        }
    });
}

module.exports.render = async (req, res) => {
    let user = await req.body.userData;
    let posts = await req.body.postsDatas;
    let curr = await req.body.index;
    await Post.find({}).sort({ createdAt: -1 }).then(async (posts) => {
        posts = await posts;
    });

    let comments = await posts[curr].comments;

    if (comments.length === 0) {
        return res.status(200).send({
            commentArray: []
        });
    }
    if (comments.length > 0) {

        const getComments = async () => {
            let temp = [];
            await Promise.all(comments.map(async (commentItem) => {
                const comment = await Comment.findById(commentItem).populate('user');
                temp.push({
                    name: comment.user.name,
                    content: comment.content
                });
            }));
            return temp;
        }
        return res.status(200).send({
            commentArray: await getComments()
        });
    }

}