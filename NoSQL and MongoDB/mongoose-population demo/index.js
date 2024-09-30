const mongoose = require('mongoose');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/testdb');

    console.log('Database connected');

    // await Comment.create({
    //     author: 'John',
    //     content: 'Nice article!'
    // });

    // const comment = await Comment.findOne({});
    // const post = await Post.findOne({});
    // post.comments.push(comment);

    // post.save();

    const post = await Post.findOne({}).populate('comments','content');
    console.log(post);
}

main();