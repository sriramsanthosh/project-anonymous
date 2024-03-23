const Post = require("../models/post");

module.exports.create = async (req, res) => {
    await Post.create({
        title: await req.body.postData.title,
        content: await req.body.postData.description,
        user: await req.body.user._id
    }).then(async (post) => {
        return res.status(200).send({
            message: "🎉 Post Uploaded!"
        })
    }).catch((err) => {
        return res.status(201).send({
            message: "☹️ Error in uploading post! Try again.."
        });
    });
}

module.exports.render = async (req, res) => {
    await Post.find({}).then(async (posts) => {
        return res.status(200).send({
            post: await posts
        });
    }).catch((err) => {
        return res.status(201).send({
            message: `Error ${err} in rendering posts`
        });
    });
}