const animalController = require("../controllers/animalController");
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/animal", animalController);
  app.use((req, res, next) => { res.render('404', { title: 'Error Page' }) });
};
