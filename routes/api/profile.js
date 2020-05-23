const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  GET api/profile/me
//@desc   Get One profile
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ mgs: 'Their is no profile for the user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  POST api/profile/
//@desc   Create or update profile
//@access Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      instagram,
      twitter,
      linkedin,
    } = req.body;

    //Build Profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/profile/
//@desc   Get all profiles
//@access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by user ID
//@access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ mgs: 'Profile Not Found' });
    }
    res.json(profile);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ mgs: 'Profile Not Found' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  DELETE api/profile/
//@desc   Delete profile and user and Post
//@access Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo Remove User Posts
    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User removed' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ mgs: 'Profile Not Found' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  PUT api/profile/experience
//@desc   Adding experience
//@access Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'company is required').not().isEmpty(),
      check('from', 'from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      from,
      to,
      description,
      current,
      location,
    } = req.body;
    //create a new object
    const newExp = {
      title,
      company,
      from,
      to,
      description,
      current,
      location,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('Server Error');
    }
  }
);

//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete experience from Profile
//@access Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    //Remove Experiance
    const profile = await Profile.findOne({ user: req.user.id });
    //get index that needs to be removed
    let delete_item = 0;
    const removeIndex = profile.experience
      .map((item) => {
        item.id;
        if (item.id === req.params.exp_id) {
          delete_item = item.id;
          return delete_item;
        }
      })
      .indexOf(req.params.exp_id);
    if (delete_item === req.params.exp_id) {
      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } else {
      res.status(400).json({ mgs: 'Experience id is wrong' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ mgs: 'Experience  Not Found' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
//@route  PUT api/profile/education
//@desc   Adding education
//@access Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'degree is required').not().isEmpty(),
      check('fieldofstudy', 'fieldofstudy is required').not().isEmpty(),
      check('from', 'from date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      from,
      to,
      description,
      current,
      fieldofstudy,
    } = req.body;
    //create a new object
    const newEdu = {
      school,
      degree,
      from,
      to,
      description,
      current,
      fieldofstudy,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('Server Error');
    }
  }
);

//@route  DELETE api/profile/education/:exp_id
//@desc   Delete education from Profile
//@access Private

router.delete('/education/:exp_id', auth, async (req, res) => {
  try {
    //Remove Experiance
    const profile = await Profile.findOne({ user: req.user.id });
    //get index that needs to be removed
    let delete_item = 0;
    const removeIndex = profile.education
      .map((item) => {
        item.id;
        if (item.id === req.params.exp_id) {
          delete_item = item.id;
          return delete_item;
        }
      })
      .indexOf(req.params.exp_id);
    if (delete_item === req.params.exp_id) {
      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } else {
      res.status(400).json({ mgs: 'education id is wrong' });
    }
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ mgs: 'education  Not Found' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/profile/github/:username
//@desc   Get User Repo from Github
//@access Public

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc
      &client_id=${config.get('gitClientID')}
      &client_secret=${config.get('gitClientSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({ mgs: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send('server Error');
  }
});

module.exports = router;
