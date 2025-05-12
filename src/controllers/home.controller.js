import db from "../models/index";
import CRUDService from "../services/CRUD.service";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = (req, res) => {
  res.render("test/about.ejs");
};

// GET /crud
let getCRUD = (req, res) => {
  res.render("crud.ejs");
};

// POST /post-crud
let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  res.send("post crud");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
};
