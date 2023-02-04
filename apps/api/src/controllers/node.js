const Node = require('../models/Node');

exports.putNodeUpdate = async (res, req) => {
  const nodeId = req.params.nodeId;
  // Only teachers and admins can update nodes
  const currentUser = req.user;
  if (!currentUser.profile.isAdmin &&
    !currentUser.profile.isTeacher
  ) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const node = Node.find({ id: nodeId });
  if (!node) {
    return res.status(404).send({message: `Could not find node with id: ${nodeId}`})
  }
  const { content, title } = req.body;
  node.content = content;
  node.title = title;
  await node.save();
  return res.status(200).send({ message: 'Node updated successfully' });
}
