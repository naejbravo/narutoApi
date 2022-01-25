const VillageRoutes = require("express").Router();
const { isAuth } = require("../../utils/middleware/auth");
const upload = require("../../utils/middleware/file");
const {
  postNewVillage,
  deleteVillage,
  getAllVillages,
  getVillage,
} = require("./village.controller");

VillageRoutes.post(
  "/",
  [isAuth],
  upload.fields([{ name: "image" }, { name: "symbol" }]),
  postNewVillage
);
VillageRoutes.get("/:id", getVillage);
VillageRoutes.get("/", getAllVillages);
VillageRoutes.delete("/:id", [isAuth], deleteVillage);

module.exports = VillageRoutes;
