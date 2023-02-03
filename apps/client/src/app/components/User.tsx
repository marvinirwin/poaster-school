import React, {useMemo} from "react";
import {SkillTree} from "./SkillTree";
import {KhanAcademyTreeToSkillTree} from "../lib/KhanAcademyTreeToSkillTree";
import {KahAcademyTrees} from "../lib/KhanAcademyTreeJson";
import {CollinsTree, CollinsTreeToSkillTree} from "../lib/CollinsTree";

export const UserInfo: React.FC<{ userId: string }> = ({userId}) => {
  const tree = useMemo(() => CollinsTreeToSkillTree(CollinsTree), [])
  return (
    <div>
      <h1>User Detail for {userId}</h1>
      <SkillTree tree={tree}/>
    </div>

  );
};
