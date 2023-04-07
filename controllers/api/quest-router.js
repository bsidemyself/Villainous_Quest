const router = require("express").Router();
const withAuth = require("../../util/withAuth");
const { Quest } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const questdata = await Quest.findAll({
      attributes: {
        order: [
          "user_id",
          "quest_title",
          "quest_setting",
          "quest_challenge",
          "quest_text",
        ],
      },
    });
    const quests = questdata.map((quest) => quest.get({ plain: true }));
    res.render("questPage", {
      quests,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const questdata = await Quest.findAll({
//       // attributes: ["id", "user_id", "quest_title", "quest_setting", "quest_challenge", "quest_text"],
//       order: [["id", "ASC"]]
//     });
//     res.render("questPage", {quests: questdata});
//     res.json(questdata);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const questdata = await Quest.findByPk(req.params.id);
//     res.json(questdata);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

router.post("/", withAuth, async (req, res) => {
  try {
    const newQuest = await Quest.create({
      // user_id: req.session.user_id,
      quest_title: req.body.quest_title,
      quest_setting: req.body.quest_setting,
      quest_challenge: req.body.quest_challenge,
      quest_text: req.body.quest_text
    });
    res.json(newQuest);
    res.render("questPage");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const questdata = await Quest.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!questdata) {
      res.status(404).json({ message: "Invalid quest ID, please try another one" });
      return;
    }
    res.status(200).json(questdata);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
