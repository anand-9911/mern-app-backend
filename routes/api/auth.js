const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');

//@route  GET api/auth
//@desc   Test Route
//@access Public

router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        return res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')

    }
    res.send('AuthRoute')

});


//@route  POSR api/auth
//@desc   Authenticate user and get the token
//@access Public


router.post('/',
    [
        check('email', 'Please enter valid email').isEmail(),
        check('password', 'Password is Needed').exists()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //See if user exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ mgs: 'Invalid Credentials' }] })
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ errors: [{ mgs: 'Invalid Credentials' }] })

            //Create a payload
            const payload = {
                user: {
                    id: user.id //with mongoose we can use id instead _id
                }
            };
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