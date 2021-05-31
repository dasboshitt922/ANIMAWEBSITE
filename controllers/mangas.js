const Manga = require('../models/mangas');
const genres = require('../seeds/genres');
const {cloudinary} = require("../cloudinary");

module.exports.index = async(req,res)=>{
    const mangas = await Manga.find({});
    res.render('mangas/index',{mangas})
}

module.exports.renderNewManga = (req,res)=>{
    res.render('mangas/new',{genres});
}

module.exports.createManga = async(req,res)=>{
    const mangas = new Manga(req.body.manga);
    mangas.images = req.files.map(f =>({url:f.path,filename:f.filename}));
    mangas.uploader = req.user._id;
    await mangas.save();
    req.flash('success','Successfully made a new Manga');
    res.redirect(`mangas/${mangas._id}`)
}

module.exports.showManga = async(req,res)=>{
    const mangas = await Manga.findById(req.params.id).populate({
        path:'comments',
        populate:{
            path:'owner'
        }
    }).populate('uploader');

    if(!mangas){
        req.flash('error','Cannot find that Manga')
        return res.redirect('/mangas')
    }
    res.render('mangas/show',{mangas})
}

module.exports.renderEditManga = async(req,res)=>{
    const id = req.params.id
    const mangas = await Manga.findById(id);
    if(!mangas){
        req.flash('error','Cannot find that Manga');
        return res.redirect('/mangas');
    }

    res.render('mangas/edit',{mangas,genres})
}

module.exports.updateManga = async(req,res)=>{
    const {id} = req.params;
    const manga = await Manga.findByIdAndUpdate(id,{...req.body.manga});
    const imgs = req.files.map(f =>({url:f.path,filename:f.filename}));
    manga.images.push(...imgs);
    await manga.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await manga.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}});
    }
    req.flash('success','Successfully updated Manga')
    res.redirect(`/mangas/${manga._id}`)
}

module.exports.destroyManga = async(req,res)=>{
    const {id} = req.params;
    await Manga.findByIdAndDelete(id);
    req.flash('success','Successfully deleted Manga')
    res.redirect('/mangas');
}