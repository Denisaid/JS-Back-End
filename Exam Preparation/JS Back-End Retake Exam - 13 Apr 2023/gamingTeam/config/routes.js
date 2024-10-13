const authController = require("../controllers/authController");
const gameController = require("../controllers/gameController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/game", gameController);
  app.use((req, res, next) => {
    res.render('404', { title: 'Error Page', idStyle: 'errorPage' });
  })
};