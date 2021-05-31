const {mangaSchema_Joi,commentSchema_Joi} = require('./schema.js')
const ExpressError = require('./utils/ExpressError');
const Manga = require('./models/mangas');
const Comment = require('./models/comments');
module.exports.isLoggedIn = (req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You must be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateManga = (req,res,next)=>{
    const {error} = mangaSchema_Joi.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else{
        next();
    }
}

module.exports.isUploader = async(req,res,next)=>{
    const {id} = req.params;
    const mangagago = await Manga.findById(id);
    if(!mangagago.uploader.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!')
        return res.redirect(`/mangas/${id}`)
    }
    next();
}

module.exports.isCommentOwner = async(req,res,next)=>{
    const {id,commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment.owner.equals(req.user._id)){
        req.flash('error','You do not have permission to do that!')
        return res.redirect(`/mangas/${id}`)
    }
    next();
}

module.exports.validateComment = (req,res,next) =>{
    const{error} = commentSchema_Joi.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg,400)
    } else{
        next();
    }
}
