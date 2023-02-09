import React, {useMemo} from "react";
import {SkillTree} from "./SkillTree";
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
      <SkillTree tree={tree} userProfile={userProfile} setUserProfile={setUserProfile}/>
  );
};
