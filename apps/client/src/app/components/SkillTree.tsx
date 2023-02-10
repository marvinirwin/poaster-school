import React, {useContext, useEffect, useMemo, useState} from "react";
import {camelCase, flatten} from "lodash";
import {flextree} from 'd3-flextree';
import TreeNode from "./TreeNode";
import {SubjectNode, useFetchWithBodyCallback, useNodes, UserProfile} from "../lib/services/useFetchedData";
import {SkillModal} from "./SkillModal";
import {UserContext} from "../lib/LoggedInUserContext";
import {useUrlState} from "../lib/userUrlState";

const maxHeight = 300;
const maxWidth = 300;

const flattenTree = <T extends { children?: T[] }>(node: T, a: T[] = []) => {
  a.push(node)
  node.children?.map(child => flattenTree(child, a))
  return a;
}

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

const getDefaultNodeId = (selectedNode?: SkillTreeNode) => camelCase(selectedNode?.title);


function getParent(flattenedTree: ({ children: CustomizableTree<SkillTreeNodeCustomProperties>[]; id: string | number } & Omit<SkillTreeNodeCustomProperties, "children">)[], selectedNode: { children: CustomizableTree<SkillTreeNodeCustomProperties>[]; id: string | number } & Omit<SkillTreeNodeCustomProperties, "children">) {
  return flattenedTree.find(node => node.children.includes(selectedNode));
}

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
  const flattenedTree = useMemo(() => flattenTree(tree), [tree]);
  const {user} = useContext(UserContext);
  const [urlNodeId, setUrlNodeId] = useUrlState('skill', undefined)
  const {
    result: nodeConfigurations,
    setResult: setNodeConfigurations,
    isLoading: isNodeConfigurationFetchInProgress
  } = useNodes();

  const nodeConfigurationMap = useMemo(() => {
    return Object.fromEntries((nodeConfigurations || []).map((nodeConfiguration) => [nodeConfiguration.id, nodeConfiguration])) as Record<string, SubjectNode>
  }, [nodeConfigurations])
  const [selectedNode, setSelectedNode] = useState<SkillTreeNode | null>(null);
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(() => Object.fromEntries(
    [tree, ...tree.children].map(t => [t.id, true])
  ));
  useEffect(() => {
    // If the selectedNode is not visible, expand until the selected node is visible
    if (selectedNode) {
      const expandAllParents = (node: SkillTreeNode) => {
        const parent = getParent(flattenedTree, node)
        if (parent && !expandedState[parent.id]) {
          // expand until parent
          expandedState[parent.id] = true;
          expandAllParents(parent)
        }
      }
      expandAllParents(selectedNode)
    }
  }, [selectedNode])
  const {nodes: flattenedPrunedTreeNodes, minLeft, minTop} = useMemo(() => {
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
  useEffect(() => {
    if (urlNodeId) {
      const selectedNode = flattenedTree.find(treeNode => treeNode.id === urlNodeId);
      if (selectedNode) {
        setSelectedNode(selectedNode);
      }
    }
  }, [urlNodeId, tree])
  const canEdit = Boolean(user?.isAdmin || user?.isTeacher);
  // TODO maybe add a specific role for this

  const selectedNodeConfiguration = nodeConfigurationMap[selectedNode?.id || ""];
  return <>
    {
      (selectedNode && !isNodeConfigurationFetchInProgress) ? <SkillModal
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
          onClose={() => {
            setUrlNodeId(undefined)
            setSelectedNode(null);
          }}
        />
        : null
    }
    <div style={
      {
        position: 'relative',
        margin: 0,
        padding: 0,
        background: '#F5F5F5',
        backgroundImage: 'linear-gradient(rgba(253, 186, 116, 0.5) .1em, transparent .1em), linear-gradient(90deg, rgba(253, 186, 116, 0.5) .1em, transparent .1em)',
        backgroundSize: '3em 3em',
        width: '10000px',
        height: '10000px'
      }
    }>
      {
        flattenedPrunedTreeNodes
          /*
                  radialTreeNodes
          */
          .map(treeNode => {
              const id = treeNode.data.id;
              const left = treeNode.left;
              const top = treeNode.top;
              const configuration = nodeConfigurationMap[id];
              const isExpanded = Boolean(expandedState[id])
              const selectedNode = flattenedPrunedTreeNodes.find(flattenedTreeNode => flattenedTreeNode.data.id === id);
              const subjectStatus = userProfile.subjectStatuses[id];
              // @ts-ignore
              const title = configuration?.title || selectedNode.data.title || JSON.stringify(selectedNode.data);
              const canExpand = Boolean(flattenedTree.find(n => n.children.length));
              return <TreeNode
                onStatusChanged={async (newStatus: string) => {
                  setSkillStatus({
                    body: {
                      nodeId: id,
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
                  // @ts-ignore
                  setUrlNodeId(selectedNode.data.id);
                }}
                style={{
                  position: 'absolute',
                  left: `${left + Math.abs(minLeft)}px`,
                  top: `${top + Math.abs(minTop)}px`,
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
                canExpand={canExpand}
                isExpanded={isExpanded}
                title={title}
              />;
            }
          )
      }
    </div>
  </>
}
