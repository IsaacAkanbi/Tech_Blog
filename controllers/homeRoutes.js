const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/homepage", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/");
  }
  // try {
  //   const postData = await Post.findAll({
  //     include: [
  //     {
  //       model: User,
  //       attributes: ['username'],
  //     },
  //   ]
  //   })
  //   const postPlain = postData.map((post) => post.get({plain: true}))
  //   res.render('homepage', {
  //     postArr: postPlain,
  //     loggedIn: req.session.loggedIn,
  //   })
  // } catch(err) {
  //   console.log(err)
  //   // res.status(500).json(err)
  // }
  // })
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/post', (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.id,
      
    },
    attributes: [
      'id',
      'title',
      'description',
      'date_created'
    ],
    include: [User, Comment]
  })
    .then(dbPostData => {
      const post = dbPostData.map(post => post.get({ plain: true }));
      res.render('post', {
        post,
        loggedIn: req.session.loggedIn,

      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get("/post", (req, res) => {
//   if (!req.session.loggedIn) {
//     res.redirect("/");
//   }
//   post
//     .findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "title", "description", "date_created"],
//       include: [User, Comment],
//   })
//     .then((dbPostData) => {
//       const post = dbPostData.map((post) => post.get({ plain: true }));

//       res.render("post", {
//         post,
//         loggedIn: req.session.loggedIn,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    console.log(req.session);

    // -- TESTING -- //
    req.session.loggedIn = true;

    res.render("comment", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.username, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/homepage");
    return;
  }

  res.render("signup");
});

module.exports = router;
