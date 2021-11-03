const express= require("express");
const User= require("../../models/User");
const {check,validationResult} = require("express-validator");
const router= express.Router();
const auth= require("../../middleware/auth")
const Profile= require("../../models/Profile");
const Post = require("../../models/Post");
const config = require("config");
const request = require("request");

//get all profiles
router.get("/",auth,async (req,res)=>{
    try {
        const profile = await Profile.find().populate('user',['name','avatar']);
        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})
//Get User Profile
router.get("/me",auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user : req.user.id}).populate('user',['name','avatar']);

        if(!profile){
            return res.status(400).json({msg:"There is no profile for this user"})
        }

        res.json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
})

//Post Profile
router.post('/',
 [auth,[
     check('status',"Status is required").not().isEmpty(),
     check('skills',"Skills is Required").not().isEmpty()
 ]], async(req, res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
  }
  const{
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
  } = req.body

  //Build profile object
  const profileFields                                 = {};
        profileFields.user                            = req.user.id;
  if    (company) profileFields.company               = company;
  if    (website) profileFields.website               = website;
  if    (location) profileFields.location             = location;
  if    (bio) profileFields.bio                       = bio;
  if    (status) profileFields.status                 = status;
  if    (githubusername) profileFields.githubusername = githubusername;
  if(skills){
      console.log("123")
      profileFields.skills = skills.split(',').map(skill =>skill.trim());
  }

  console.log(skills);
  //build social object
    profileFields.social                     = {};
    if(youtube)profileFields.social.youtube     = youtube;
    if(twitter)profileFields.social.twitter     = twitter;
    if(facebook)profileFields.social.facebook   = facebook;
    if(linkedin)profileFields.social.linkedin   = linkedin;
    if(instagram)profileFields.social.instagram = instagram;

  try {
      let profile = await Profile.findOne({user: req.user.id});

      if(profile){
          profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
          return res.json(profile)
      }
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
      
  } catch (error) {
      console.log(error);
      res.status(500).send("server error")
  }
})

//get user profile by user id
router.get('/user/:user_id',auth, async(req, res) => {
try {
    const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
    if(!profile){
        return res.status(400).json({msg:'profile not found'});
    }
    res.json(profile);
} catch (error) {
    console.error(error.message);
    if(error.kind =='ObjectId'){
        return res.status(400).json({msg:'profile not found'});
    }
    res.status(500).send("server erro")
}
})
//delete profile and user
router.delete('/',auth, async(req, res) => {
    try {

        //remove User posts
        await Post.deleteMany({user:req.user.id})
        //remove profile
        await Profile.findOneAndRemove({user:req.user.id});

        //Remove User
        await User.findOneAndRemove({ _id:req.user.id});
        res.json({msg:"User deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
    })
//add and update experience
router.put('/experience',[auth,[
    check('title',"Title is required").not().isEmpty(),
    check('company',"Company is required").not().isEmpty(),
    check('from',"From date is required").not().isEmpty()
]], async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }=req.body;

        const newExp={
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try{
            const profile = await Profile.findOne({user : req.user.id});
            profile.experience.unshift(newExp);//similar like push method to array
            await profile.save();
            res.json(profile);
        }
     catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
    })
//delete experience
router.delete("/experience/:exp_id",auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user : req.user.id});
        //Get remove index
        const removeIndex = profile.experience.map(item =>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

//add or update education
router.put('/education',[auth,[
    check('school',"School is required").not().isEmpty(),
    check('degree',"Degree is required").not().isEmpty(),
    check('fieldofstudy',"Degree is required").not().isEmpty(),
    check('from',"From date is required").not().isEmpty()

]], async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const{
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }=req.body;

        const newEdu={
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try{
            const profile = await Profile.findOne({user : req.user.id});
            profile.education.unshift(newEdu);//similar like push method to array
            await profile.save();
            res.json(profile);
        }
     catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
    })

//delete education
router.delete("/education/:edu_id",auth,async(req,res)=>{
    try {
        const profile = await Profile.findOne({user : req.user.id});
        //Get remove index
        const removeIndex = profile.education.map(item =>item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error in delete")
    }
})

//get repos from github

router.get('/github/:username',(req,res)=>{
    try {
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error) console.log(error);

            if(response.statusCode !==200){
                return res.status(400).json({msg:"No github profile found"});
            }
            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error")
    }
})

module.exports = router