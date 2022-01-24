const Character = require("./character.model");
const { setError } = require("../../utils/errors/error");
const { deleteFile } = require("../../utils/middleware/deleteFile");

const postNewCharacter = async (req, res, next) => {
  try {
    const newCharacter = new Character(req.body);
    if (req.file) {
      newCharacter.image = req.file.path;
    }
    const characterDB = await newCharacter.save();
    return res.status(201).json(characterDB);
  } catch (error) {
    return next(setError(500, "character not save"));
  }
};

const getAllCharacters = async (req, res, next) => {
  try {
    const charactersDB = await Character.find();
    return res.status(200).json(charactersDB);
  } catch (error) {
    return next(setError(500, "characters not found"));
  }
};

const getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDB = await Character.findById(id);
    if (!characterDB) {
      return next(setError(400, "characters not found"));
    }
    return res.status(200).json(characterDB);
  } catch (error) {
    return next(setError(500, "characters not found"));
  }
};

const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterDB = await Character.findByIdAndDelete(id);
    if (!characterDB) {
      return next(setError(400, "characters not found"));
    }
    if (characterDB.image) {
      deleteFile(characterDB.image);
    }
    return res.status(200).json(characterDB);
  } catch (error) {
    return next(setError(500, "characters not found"));
  }
};

module.exports = {
  postNewCharacter,
  getAllCharacters,
  getCharacter,
  deleteCharacter,
};

