const auctionController = require("../controllers/auctionController");
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");

module.exports = (app) => {
  app.use("/", homeController);
  app.use("/auth", authController);
  app.use("/auction", auctionController);
  app.use((req, res, nex) => {
    res.render('404', { title: 'Error Page' });
  });
};