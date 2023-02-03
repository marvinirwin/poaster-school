import React, {useMemo} from "react";
import {SkillTree} from "./SkillTree";
import {KhanAcademyTreeToSkillTree} from "../lib/KhanAcademyTreeToSkillTree";
import {KahAcademyTrees} from "../lib/KhanAcademyTreeJson";

export const UserInfo: React.FC<{ userId: string }> = ({userId}) => {
  const tree = useMemo(() => KhanAcademyTreeToSkillTree(KahAcademyTrees[0]), [])
  return (
    <div>
      <h1>User Detail for {userId}</h1>
      <SkillTree tree={tree}/>
    </div>

  );
};
