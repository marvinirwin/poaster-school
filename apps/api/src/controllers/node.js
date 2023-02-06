const Node = require('../models/Node');

exports.putNodeUpdate = async (req, res) => {
  const {content, title, topicFrames} = req.body;
  const nodeId = req.params.nodeId;
  // Only teachers and admins can update nodes
  const currentUser = req.user;
  if (!currentUser.profile.isAdmin &&
    !currentUser.profile.isTeacher
  ) {
    return res.status(401).send({message: 'Unauthorized'});
  }
  let node = await Node.findOne({id: nodeId}).exec();
  if (!node) {
    node = new Node({id: nodeId, content, title, topicFrames})
  }
  node.set({
    content,
    title,
    id: nodeId
  })
  await node.save();
  return res.status(200).send({message: 'Node updated successfully', result: node});
}
exports.getList = async (req, res) => {
  res.status(200).json({result: await Node.find().exec()})
}
