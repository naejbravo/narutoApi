const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: "String", trim: true, required: true },
    abilities: [{ type: "String", trim: true }],
    isAlive: { type: "Boolean" },
    age: { type: "Number" },
    clan: { type: "String", trim: true },
    team: [{ type: "String", trim: true }],
    image: { type: "String", trim: true },
  },
  { timestamps: true }
);

const Character = mongoose.model("characters", characterSchema);
module.exports = Character;
