const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const User = require('../models/User');



// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["title"],
    });
    const postArr = dbPostData.map((title) => title.get({ plain: true }));
    const posts = [
      ...new Map(
        postArr.map((item) => [JSON.stringify(item), item])
      ).values(),
    ];
    console.log("posts", posts);
    res.render("landing", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// removed withAuth
router.get("/post/:title", withAuth, async (req, res) => {
  try {
    const dbPostData = await post.findAll({
      where: {
        Post: req.params.post,
      },
      include:[comment]
    });
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    console.log("posts", posts);
    res.render("post", {
      posts,
      loggedIn: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});
module.exports = router;
