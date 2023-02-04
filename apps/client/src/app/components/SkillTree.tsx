import React, {useMemo, useState} from "react";
import {flatten} from "lodash";
import {flextree} from 'd3-flextree';
import TreeNode from "./TreeNode";
import {useFetchWithBodyCallback, UserProfile} from "../lib/services/useFetchedData";
import {setSubjectStatusForUser} from "../lib/services/usePost";

const maxHeight = 200;
const maxWidth = 200;

export type SkillTreeNodeCustomProperties = { title: string, content: React.ReactNode };

export type CustomizableTree<T> = {
  children: CustomizableTree<T>[]
  id: string | number
} & Omit<T, 'children'>;

export type SkillTreeNode = CustomizableTree<SkillTreeNodeCustomProperties>;

export type SizedTree = CustomizableTree<{ size: [number, number] } & SkillTreeNodeCustomProperties>;

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
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>({});
  const {nodes, minLeft, minTop} = useMemo(() => {
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
    const nodes: any[] = []
    const hierarchy = layout.hierarchy(giveHeightAndWidth(tree));
    layout(hierarchy)
    hierarchy.each(n => {
      if (n.left < minLeft) {
        minLeft = n.left;
      }
      if (n.top < minTop) {
        minTop = n.top;
      }
      nodes.push(n);
    });
    return {nodes, minLeft, minTop};
  }, [tree, expandedState]);
  const {
    func: setSkillStatus,
    isFetchInProgress
  } = useFetchWithBodyCallback({
    url: `/api/user/${userProfile.id}/skill`,
    loadingMessage: "Updating skill",
    errorMessage: "Error updating skill.  Please try again or contact us",
    method: "PUT"
  })

  return <div style={{position: 'relative'}}>
    {
      nodes
        .map(treeNode => {
            const isExpanded = Boolean(expandedState[treeNode.data.id])
            return <TreeNode
              onStatusChanged={(newStatus: string) => {
                const nodeId = treeNode.data.id;
                setSkillStatus({nodeId: nodeId, status: newStatus, userId: userProfile.id})
                  .then(newUserProfile => setUserProfile(newUserProfile))
              }}
              key={treeNode.data.id}
              status={userProfile.subjectStatuses[treeNode.data.id]}
              style={{
                position: 'absolute',
                left: `${treeNode.left + Math.abs(minLeft)}px`,
                top: `${treeNode.top + Math.abs(minTop)}px`,
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
                  [treeNode.data.id]: expanded
                }))
              }}
              isExpanded={isExpanded}
              title={`${treeNode.data.title || JSON.stringify(treeNode.data)}`}
            />;
          }
        )
    }
  </div>
}
