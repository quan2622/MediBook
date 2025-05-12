let getHomePage = (req, res) => {
  res.render("homePage.ejs");
}

let getAboutPage = (req, res) => {
  res.render("test/about.ejs");
}

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
