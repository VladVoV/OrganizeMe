const { Post, validatePost } = require("../models/post.model");
const {Tag} = require("../models/tag.model");

exports.retrievePosts = async (req, res) => {
    let all_posts = await Post.find().populate("author", "username");
    res.send(all_posts);
}

exports.retrievePostById = async (req, res) => {
    try {
        const post = await Post.find({ _id: req.params.id }).populate(
            "author",
            "username"
        );
        const views = post[0].views;
        post[0].views = views + 1;
        const result = await post[0].save();
        res.send(post[0]);
    } catch (ex) {
        return res.send(ex.message);
    }
}

exports.createPost = async (req, res) => {
    const { error } = validatePost(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const tags = req.body.tags;
    const tags_array = [];
    for (let i = 0; i < tags.length; i++) {
        const tag_in_db = await Tag.findById(tags[i]);
        if (!tag_in_db) return res.status(400).send("Invalid Tag");
        tags_array.push(tag_in_db);
    }
    const post = new Post({
        title: req.body.title,
        tags: tags_array,
        description: req.body.description,
        author: req.userId,
        views: 1,
    });
    try {
        await post.save();
        res.send("Post succesfully created.");
    } catch (err) {
        console.log("error: ", err);
    }
}

exports.updateLike = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).send("Post doesn't exists");
    if (post.author === req.userId)
        return res.status(400).send("You can't upvote your own post");
    const upvoteArray = post.upvotes;
    const index = upvoteArray.indexOf(req.userId);
    if (index === -1) {
        upvoteArray.push(req.userId);
    } else {
        upvoteArray.splice(index, 1);
    }
    post.upvotes = upvoteArray;
    const result = await post.save();
    const post_new = await Post.find({ _id: post._id }).populate(
        "author",
        "username"
    );
    res.send(post_new);
}
