const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const villageSchema = new Schema(
  {
    name: { type: "String", trim: true, required: true },
    kage: { type: "String", trim: true },
    country: { type: "String", trim: true },
    clans: [{ type: "String", trim: true }],
    image: { type: "String", trim: true },
    symbol: { type: "String", trim: true },
    ninjas: [{ type: Schema.Types.ObjectId, ref: "characters" }],
  },
  { timestamps: true }
);

const Village = mongoose.model("villages", villageSchema);
module.exports = Village;
