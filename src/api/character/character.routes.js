const CharacterRoutes = require("express").Router();
const { isAuth } = require("../../utils/middleware/auth");
const upload = require("../../utils/middleware/file");
const {
  postNewCharacter,
  deleteCharacter,
  getAllCharacters,
  getCharacter,
} = require("./character.controller");

CharacterRoutes.post("/", [isAuth], upload.single("image"), postNewCharacter);
CharacterRoutes.get("/:id", getCharacter);
CharacterRoutes.get("/", getAllCharacters);
CharacterRoutes.delete("/:id", [isAuth], deleteCharacter);

module.exports = CharacterRoutes;
