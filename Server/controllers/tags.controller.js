const { Tag, validateTag } = require("../models/tag.model");


exports.retrieveTag = async (req, res) => {
    const tags = await Tag.find();
    res.send(tags);
}

exports.createTag = async (req, res) => {
    const { error } = validateTag(req.body);
    if (error) return res.status(400).send("enter a valid tag");
    const tag = new Tag({
        name: req.body.name,
    });
    try {
        await tag.save();
        console.log("tag created");
        res.send(_.pick(tag, ["_id","name", "used" ]));
    } catch (err) {
        console.log("err", err);
    }
}
