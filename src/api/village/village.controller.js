const Village = require("./village.model");
const { setError } = require("../../utils/errors/error");
const { deleteFile } = require("../../utils/middleware/deleteFile");

const postNewVillage = async (req, res, next) => {
  console.log("sacamos reqbody", JSON.parse(JSON.stringify(req.body)));
  try {
    const newVillage = new Village(req.body);
    if (req.file) {
      newVillage.image = req.file.path;
      newVillage.symbol = req.file.path;
    }
    console.log(newVillage);
    const villageDB = await newVillage.save();
    return res.status(201).json(villageDB);
  } catch (error) {
    return next(setError(500, "Village not save"));
  }
};

const getAllVillages = async (req, res, next) => {
  try {
    const villagesDB = await Village.find().populate("ninjas");
    return res.status(200).json(villagesDB);
  } catch (error) {
    return next(setError(500, "Villages not found"));
  }
};

const getVillage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const villageDB = await Village.findById(id).populate("ninjas");
    if (!villageDB) {
      return next(setError(400, "Villages not found"));
    }
    return res.status(200).json(villageDB);
  } catch (error) {
    return next(setError(500, "Villages not found"));
  }
};

const deleteVillage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const villageDB = await Village.findByIdAndDelete(id);
    if (!villageDB) {
      return next(setError(400, "Villages not found"));
    }
    if (villageDB.image) {
      deleteFile(villageDB.image);
    }
    return res.status(200).json(villageDB);
  } catch (error) {
    return next(setError(500, "Villages not found"));
  }
};

module.exports = {
  postNewVillage,
  getAllVillages,
  getVillage,
  deleteVillage,
};
