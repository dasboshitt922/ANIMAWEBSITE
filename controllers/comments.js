const Manga = require('../models/mangas');
const Comment = require('../models/comments');

module.exports.createComment = async(req,res)=>{
    const manga = await Manga.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.owner = req.user._id;
    manga.comments.push(comment);
    await comment.save();
    await manga.save();
    req.flash('success','Comment Added')
    res.redirect(`/mangas/${manga._id}`)
}

module.exports.destroyComment = async(req,res)=>{
    const{id,commentId} = req.params;
    await Manga.findByIdAndUpdate(id,{$pull:{comments:commentId}})
    await Comment.findByIdAndDelete(commentId);
    req.flash('success','Comment Deleted')
    res.redirect(`/mangas/${id}`);
}