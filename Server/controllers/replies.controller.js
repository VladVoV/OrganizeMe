const { Reply, validateReply } = require("../models/replies.model");
const { Post, validatePost} = require("../models/post.model");

exports.createReply = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
    } catch (ex) {
        return res.status(400).send("The Post with given ID doesn't exists!");
    }
    const { error } = validateReply(req.body);
    if (error) res.status(400).send(error.details[0].message);
    const reply = new Reply({
        post: req.params.id,
        comment: req.body.comment,
        author: req.userId,
    });
    try {
        await reply.save();
        const reply_populated = await Reply.find({ _id: reply._id }).populate(
            "author",
            "username"
        );
        res.send(reply_populated);
    } catch (ex) {
        console.log("error: ", ex);
    }
}

exports.retrieveReply = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
        } catch (ex) {
            return res.status(400).send("The Post with given ID doesn't exists!");
        }
        const replies = await Reply.find({ post: req.params.id }).populate(
            "author",
            "username"
        );
        res.send(replies);
}

exports.updateReply = async (req, res) => {
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(400).send("reply doesn't exists");
    if (reply.author === req.userId)
        return res.status(400).send("You can't upvote your own reply");
    const upvoteArray = reply.upvotes;
    const index = upvoteArray.indexOf(req.userId);
    if (index === -1) {
        upvoteArray.push(req.userId);
    } else {
        upvoteArray.splice(index, 1);
    }
    reply.upvotes = upvoteArray;
    const result = await reply.save();
    const reply_new = await Reply.find({ _id: reply._id }).populate(
        "author",
        "username"
    );
    res.send(reply_new);
}
