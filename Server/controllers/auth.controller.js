const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        const savedUser = await user.save();

        if (req.body.roles) {
            const roles = await Role.find({ name: { $in: req.body.roles } });
            savedUser.roles = roles.map((role) => role._id);
        } else {
            const defaultRole = await Role.findOne({ name: "user" });
            savedUser.roles = [defaultRole._id];
        }

        await savedUser.save();

        res.send({ message: "User was registered successfully!" });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).populate('roles', '-__v');

        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid Password!' });
        }

        const token = jwt.sign(
            { id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                expiresIn: 86400,
            }
        );

        let authorities = user.roles.map(role => 'ROLE_' + role.name.toUpperCase());

        req.session.token = token;

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        this.next(err);
    }
};
