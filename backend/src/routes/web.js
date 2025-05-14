import express from "express";
import homeController from "../controllers/home.controller";
import userController from "../controllers/user.controller"

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.hanleLogin);
  router.get("/api/get-all-user", userController.getAllUser)

  return app.use("/", router);
};

module.exports = initWebRoutes;
