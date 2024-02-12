const Post = require("../models/post");

module.exports.create = function(req, res){
    Post.create({
        title: req.body.postData.title,
        content: req.body.postData.description,
        user: req.body.user._id
    }).then((post)=>{
        return res.status(200).send({
            message : "🎉 Post Uploaded!"
        })
    }).catch((err)=>{
        return res.status(201).send({
            message: "☹️ Error in uploading post! Try again.."
        });
    });
}

module.exports.render = (req, res)=>{
    Post.find({}).then((posts)=>{
        return res.status(200).send({
            post: posts
        });
    }).catch((err)=>{
        return res.status(201).send({
            message: `Error ${err} in rendering posts`
        });
    });
}