import React, {useMemo} from "react";
import {SkillTree} from "./SkillTree";
import {KhanAcademyTreeToSkillTree} from "../lib/KhanAcademyTreeToSkillTree";
import {KahAcademyTrees} from "../lib/KhanAcademyTreeJson";
import {CollinsTree, CollinsTreeToSkillTree} from "../lib/CollinsTree";
import {UserProfile} from "../lib/services/useFetchedData";

export const UserInfo: React.FC<{
  userProfile: UserProfile,
  setUserProfile: (newUserProfile: UserProfile) => void,
}> = (
  {
    userProfile,
    setUserProfile
  }) => {
  const tree = useMemo(() => CollinsTreeToSkillTree(CollinsTree), [])
  return (
    <div>
      <h1>User Detail for {userProfile.email || userProfile.name}</h1>
      <SkillTree tree={tree} userProfile={userProfile} setUserProfile={setUserProfile}/>
    </div>

  );
};
