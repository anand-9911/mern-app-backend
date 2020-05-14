const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

//@route  POST api/user
//@desc   Register User
//@access Public

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more character').isLength({
            min: 6
        })
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ mgs: 'User already exists' }] })
            }
            //Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200', //size
                r: 'pg',//rating
                d: 'mm'//some image
            })
            //Creating instance of the user
            user = new User({
                name,
                email,
                avatar,
                password
            });
            //Encrypt Password
            //1. Creating a salt to do the hashing with
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            //Saving the user to the database
            await user.save();
            //Create a payload
            const payload = {
                user: {
                    id: user.id //with mongoose we can use id instead _id
                }
            };

            console.log(payload)

            //return json webtoken
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err)
                        throw err;
                    res.json({ token })
                }
            );

        } catch (error) {
            console.log(error.message);
            res.status(500).send('server error');
        }
    }
);

module.exports = router;