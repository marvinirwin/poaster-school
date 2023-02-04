const {Schema, model} = require("mongoose");

const nodeSchema = new Schema({
  content: String,
  title: String,
  id: String,
}, { timestamps: true });

const Node = model('Node', nodeSchema);

module.exports = Node;
