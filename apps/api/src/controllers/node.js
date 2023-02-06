const Node = require('../models/Node');

exports.putNodeUpdate = async (res, req) => {
  const {content, title, topicFrames} = req.body;
  const nodeId = req.params.nodeId;
  // Only teachers and admins can update nodes
  const currentUser = req.user;
  if (!currentUser.profile.isAdmin &&
    !currentUser.profile.isTeacher
  ) {
    return res.status(401).send({message: 'Unauthorized'});
  }
  let node = Node.find({id: nodeId});
  if (!node) {
    node = new Node({id: nodeId, content, title, topicFrames})
  }
  node.content = content;
  node.title = title;
  await node.save();
  return res.status(200).send({message: 'Node updated successfully'});
}
exports.getList = async (req, res) => {
  res.status(200).json({result: await Node.find().exec()})
}
