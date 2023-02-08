import React, {useContext, useEffect, useMemo, useState} from "react";
import {camelCase, flatten} from "lodash";
import {flextree} from 'd3-flextree';
import TreeNode from "./TreeNode";
import {SubjectNode, useFetchWithBodyCallback, useNodes, UserProfile} from "../lib/services/useFetchedData";
import {SkillModal} from "./SkillModal";
import {UserContext} from "../lib/LoggedInUserContext";
import * as d3 from 'd3'
import {useClosableModal} from "../lib/UseClosableModal";

const maxHeight = 200;
const maxWidth = 200;

export type SkillTreeNodeCustomProperties = { title: string, content: string };

export type CustomizableTree<T> = {
  children: CustomizableTree<T>[]
  id: string | number
} & Omit<T, 'children'>;

export type SkillTreeNode = CustomizableTree<SkillTreeNodeCustomProperties>;

export type SizedTree = CustomizableTree<{ size: [number, number] } & SkillTreeNodeCustomProperties>;

interface TreeNode {
  id: string;
  children?: TreeNode[];
}

interface RadialTreeNode {
  id: string;
  x: number;
  y: number;
  children?: RadialTreeNode[];
}

const buildRadialTree = (root: TreeNode, radius = 500, startAngle = 0, endAngle = 90): RadialTreeNode => {
  const radialRoot: RadialTreeNode = {id: root.id, x: 0, y: 0};

  if (!root.children) {
    return radialRoot;
  }

  const angleRange = endAngle - startAngle;
  const step = angleRange / (root.children.length + 1);

  radialRoot.children = root.children.map((child, index) => {
    const angle = startAngle + (index + 1) * step;
    const x = radius * Math.cos(angle * Math.PI / 180);
    const y = radius * Math.sin(angle * Math.PI / 180);

    return {
      id: child.id,
      x,
      y,
      children: child?.children?.map(child => buildRadialTree(child, radius * 0.8, startAngle, endAngle))
    };
  });

  return radialRoot;
};

//@ts-ignore
const buildRadialD3Tree = (skillTreeRoot: SkillTreeNode, svgId: string) => {
  let testData = {"name" : "A", "info" : "tst", "children" : [
      {"name" : "A1", "children" : [

          {"name" : "A12" },
          {"name" : "A13" },
          {"name" : "A14" },
          {"name" : "A15" },
          {"name" : "A16" }
        ] },
      {"name" : "A2", "children" : [
          {"name" : "A21" },
          {"name" : "A22", "children" : [
              {"name" : "A221" },
              {"name" : "A222" },
              {"name" : "A223" },
              {"name" : "A224" }
            ]},
          {"name" : "A23" },
          {"name" : "A24" },
          {"name" : "A25" }] },
      {"name" : "A3", "children": [
          {"name" : "A31", "children" :[
              {"name" : "A311" },
              {"name" : "A312" },
              {"name" : "A313" },
              {"name" : "A314" },
              {"name" : "A315" }
            ]}] }
    ]};
  let height = 4000;
  let width = 4000;

  let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  let diameter = height * 0.75;
  let radius = diameter / 2;

  let tree = d3.tree()
    .size([2*Math.PI, radius])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

  // let data = d3.hierarchy(skillTreeRoot)
  let data = d3.hierarchy(skillTreeRoot)

  //@ts-ignore
  let treeData = tree(data);

  let nodes = treeData.descendants();
  let links = treeData.links();

  let graphGroup = svg.append('g')
    .attr('transform', "translate("+(width/2)+","+(height/2)+")");

  graphGroup.selectAll(".link")
    .data(links)
    .join("path")
    .attr("class", "link")
    .attr("stroke-width", 1.5)
  //@ts-ignore
    .attr("d", d3.linkRadial()
      //@ts-ignore
      .angle(d => d.x)
      //@ts-ignore
      .radius(d => d.y));

  let node = graphGroup
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .attr("class", "node")
    .attr("transform", function(d){
      return `rotate(${d.x * 180 / Math.PI - 90})` + `translate(${d.y}, 0)`;
    });


  node.append("circle").attr("r", 1);

  node.append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("dx", function(d) { return d.x < Math.PI ? 8 : -8; })
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return d.x < Math.PI ? "start" : "end"; })
    .attr("transform", function(d) { return d.x < Math.PI ? null : "rotate(180)"; })
    //@ts-ignore
    .text(function(d) { return d.data.title; });
/*
  let diameter = 800;

  let margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = diameter,
    height = diameter;

  let i = 0,
    duration = 350,
    //@ts-ignore
    root;

  //
  let tree = d3.tree()
    .size([360, diameter / 2 - 80])
    .separation(function (a, b) {
      return (a.parent == b.parent ? 1 : 10) / a.depth;
    });

  // @ts-ignore
  let diagonal = d3.linkRadial()
/!*
    .projection(function (d) {
      return [d.y, d.x / 180 * Math.PI];
    });
*!/

  let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

  //@ts-ignore
  root = skillTreeRoot;
  //@ts-ignore
  root.x0 = height / 2;
  //@ts-ignore
  root.y0 = 0;

//root.children.forEach(collapse); // start with all children collapsed
  update(root);

  d3.select(self.frameElement).style("height", "800px");

  //@ts-ignore
  function update(source) {

    // Compute the new tree layout.
    //@ts-ignore
    let nodes = tree.nodes(root),
      //@ts-ignore
      links = tree.links(nodes);

    // Normalize for fixed-depth.
    //@ts-ignore
    nodes.forEach(function (d) {
      d.y = d.depth * 80;
    });

    // Update the nodes…
    let node = svg.selectAll("g.node")
      //@ts-ignore
      .data(nodes, function (d) {
        //@ts-ignore
        return d.id || (d.id = ++i);
      });

    // Enter any new nodes at the parent's previous position.
    let nodeEnter = node.enter().append("g")
      .attr("class", "node")
      //.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
      .on("click", () => {
        alert("TODO")
      });

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function (d) {
        //@ts-ignore
        return d._children ? "lightsteelblue" : "#fff";
      });

    nodeEnter.append("text")
      .attr("x", 10)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      //.attr("transform", function(d) { return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length * 8.5)  + ")"; })
      .text(function (d) {
        // @ts-ignore
        return d.title;
      })
      .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    let nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function (d) {
        //@ts-ignore
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
      })

    nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function (d) {
        //@ts-ignore
        return d._children ? "lightsteelblue" : "#fff";
      });

    nodeUpdate.select("text")
      .style("fill-opacity", 1)
      .attr("transform", function (d) {
        //@ts-ignore
        return d.x < 180 ? "translate(0)" : "rotate(180)translate(-" + (d.name.length + 50) + ")";
      });

    // TODO: appropriate transform
    let nodeExit = node.exit().transition()
      .duration(duration)
      //.attr("transform", function(d) { return "diagonal(" + source.y + "," + source.x + ")"; })
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // Update the links…
    let link = svg.selectAll("path.link")
      .data(links, function (d) {
        //@ts-ignore
        return d.target.id;
      });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function (d) {
        let o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", function (d) {
        let o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

    // Stash the old positions for transition.
    //@ts-ignore
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

*/
}

const getDefaultNodeId = (selectedNode?: SkillTreeNode) => camelCase(selectedNode?.title);

export const SkillTree: React.FC<{
  tree: SkillTreeNode,
  userProfile: UserProfile,
  setUserProfile: (newProfile: UserProfile) => void,
}> = (
  {
    tree,
    userProfile,
    setUserProfile
  }) => {
  const {user} = useContext(UserContext);
  const canEdit = Boolean(user?.isAdmin || user?.isTeacher);
  const {
    result: nodeConfigurations,
    setResult: setNodeConfigurations,
    isLoading: isNodeListFetchInProgress
  } = useNodes();
  const nodeConfigurationMap = useMemo(() => {
    return Object.fromEntries((nodeConfigurations || []).map((nodeConfiguration) => [nodeConfiguration.id, nodeConfiguration])) as Record<string, SubjectNode>
  }, [nodeConfigurations])
  const [selectedNode, setSelectedNode] = useState<SkillTreeNode | null>(null);
  const walkTree = <T extends { children?: T[] }>(node: T, a: T[] = []) => {
    a.push(node)
    node.children?.map(child => walkTree(child, a))
    return a;
  }
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(() => Object.fromEntries(
    walkTree(tree).map(t => [t.id, true])
  ));
  const radialTree = useMemo(() => {
    // @ts-ignore
    return buildRadialTree(tree)
  }, [tree])
  const radialTreeNodes = walkTree(radialTree);
  const minX = Math.min(...radialTreeNodes.map(n => n.x))
  const minY = Math.min(...radialTreeNodes.map(n => n.y))

  const {nodes: flattenedTreeNodes, /*minLeft, minTop*/} = useMemo(() => {
    const giveHeightAndWidth = (drawTree: SkillTreeNode): SizedTree => {
      const isExpanded = Boolean(expandedState[drawTree.id]);
      return {
        ...drawTree,
        // Width, height
        size: [maxWidth, maxHeight],
        children: isExpanded ? drawTree.children.map(giveHeightAndWidth) : []
      }
    }
    const flattenTree = (tree: SizedTree): SizedTree[] => {
      return [tree, ...flatten(tree.children.map(flattenTree))]
    }

    const layout = flextree({});
    let minLeft: number = 0;
    let minTop: number = 0;
    const nodes: { data: SkillTreeNode, left: number, top: number }[] = []
    const hierarchy = layout.hierarchy(giveHeightAndWidth(tree));
    layout(hierarchy)
    hierarchy.each(n => {
      if (n.left < minLeft) {
        minLeft = n.left;
      }
      if (n.top < minTop) {
        minTop = n.top;
      }
      //@ts-ignore
      nodes.push(n);
    });
    return {nodes, minLeft, minTop};
  }, [tree, expandedState]);
  const {
    func: setSkillStatus,
    isFetchInProgress: isSettingSkillStatusInProgress
  } = useFetchWithBodyCallback<UserProfile>({
    url: ``,
    loadingMessage: "Updating skill",
    errorMessage: "Error updating skill.  Please try again or contact us",
    method: "PUT"
  });
  const {
    func: updateNode,
    isFetchInProgress: isUpdatingNode,
  } = useFetchWithBodyCallback<SubjectNode>({
    url: ``,
    loadingMessage: "Updating skill tree content",
    errorMessage: "Error updating skill tree content.  Please try again or contact us",
    method: "PUT",
    deps: [selectedNode]
  })

  // TODO maybe add a specific role for this

  const selectedNodeConfiguration = nodeConfigurationMap[selectedNode?.id || ""];
  const [svgRef, setSvgRef] = useState<SVGElement | null>();
  useEffect(() => {
    if (svgRef) {
      // buildRadialD3Tree(tree, 'test')
    }
  }, [svgRef])
  return <>
    {
      selectedNode ? <SkillModal
          content={selectedNodeConfiguration?.content || selectedNode.content}
          title={selectedNodeConfiguration?.title || selectedNode.title}
          setContent={
            async newContent => {
              let node: SubjectNode;
              if (!selectedNodeConfiguration) {
                // Create a new one
                node = {
                  content: newContent,
                  title: selectedNode.title,
                  topicFrames: [],
                  id: camelCase(selectedNode.title)
                }
              } else {
                node = {
                  ...selectedNodeConfiguration,
                  content: newContent,
                }
              }
              const result = await updateNode({
                  body: node,
                  url: `/api/node/${selectedNode.id || getDefaultNodeId(selectedNode)}/update`
                }
              );
              setNodeConfigurations(nodeConfigurations?.filter(v => v.id !== result.id)?.concat(result) || [])
            }
          }
          canEdit={canEdit}
          topicFrames={selectedNodeConfiguration?.topicFrames || []}
          onClose={() => setSelectedNode(null)}
        />
        : null
    }
    <div style={{position: 'relative'}}>
      {
        /*flattenedTreeNodes.*/
        radialTreeNodes
          .map(treeNode => {
              const id = treeNode./*data.*/id;
              const configuration = nodeConfigurationMap[id];
              const isExpanded = Boolean(expandedState[id])
              const selectedNode = flattenedTreeNodes.find(flattenedTreeNode => flattenedTreeNode.data.id === id);
              const subjectStatus = userProfile.subjectStatuses[id];
              // @ts-ignore
              const title = configuration?.title || selectedNode.data.title || JSON.stringify(selectedNode.data);
              return <TreeNode
                onStatusChanged={async (newStatus: string) => {
                  const nodeId = id;
                  setSkillStatus({
                    body: {
                      nodeId: nodeId,
                      status: newStatus,
                      userId: userProfile.id
                    },
                    url: `/api/user/${userProfile.id}/skill`
                  }).then(newUserProfile => {
                    setUserProfile(newUserProfile);
                  })
                }}
                key={id}
                status={subjectStatus}
                onShowContent={() => {
                  // @ts-ignore
                  setSelectedNode(selectedNode.data);
                }}
                style={{
                  position: 'absolute',
                  left: `${(treeNode.x + minX) * 2/*left + Math.abs(minLeft)*/}px`,
                  top: `${(treeNode.y + minY) * 2/*top + Math.abs(minTop)*/}px`,
                  width: maxWidth + 'px',
                  height: 'auto',
                  maxWidth: maxWidth + 'px',
                  maxHeight: maxHeight + 'px',
                  overflowWrap: 'anywhere',
                  overflow: 'hidden',
                  transition: '1s'
                }}
                onExpandToggled={(expanded: boolean) => {
                  setExpandedState(currentExpandedState => ({
                    ...currentExpandedState,
                    [id]: expanded
                  }))
                }}
                isExpanded={isExpanded}
                title={`${title}`}
              />;
            }
          )
      }
    </div>
  </>
}
