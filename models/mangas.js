const mongoose = require('mongoose');
const Comment = require('./comments')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_250');
})

const MangaSchema = new Schema({
    title:String,
    author:String,
    description:String,
    images: [ImageSchema],
    genre:[{type:String}],
    uploader:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:'Comment'
    }]
});

MangaSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Manga',MangaSchema);