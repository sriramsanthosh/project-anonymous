const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

module.exports.create = (req, res)=>{
    Post.findById(req.body.currPostID).then((post)=>{
        if(post){
            Comment.create({
                content: req.body.commentText,
                post: post._id,
                user: req.body.userData._id
            }).then((comment)=>{
                post.comments.push(comment);
                post.save();
                let message = `🎉 Comment posted` ;
                return res.status(200).send({
                    message: message
                })
            }).catch((err)=>{
                let message = `Error ${err}, in posting comment`;
                return res.status(201).send({
                    message: message
                })            
            });
        }
    });
}

module.exports.render = async(req, res)=>{
    let user = req.body.userData;
    let posts = req.body.postsDatas;
    let curr =  req.body.index;
    Post.find({}).then((posts)=>{
        posts = posts;
    });
    
    let comments = posts[curr].comments;
  
    let temp = [];

    if(comments.length>0){
        
        comments.map(async(commentItem, index)=>{
            await Comment.findById(commentItem).populate('user').then(async(comment)=>{
                temp.push(
                    {
                        name: comment.user.name,
                        content: comment.content
                    }
                );
            });
        });
        setTimeout(() => {
            return res.status(200).send({
                commentArray: temp
            });       
        }, 3000);
    }
    else{
        return res.status(200).send({
            commentArray: temp
        });
    }
}