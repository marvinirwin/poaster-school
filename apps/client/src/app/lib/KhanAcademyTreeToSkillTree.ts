import {KhanAcademyTree} from "./KhanAcademyTree";
import {SkillTreeNode} from "../components/SkillTree";

export const KhanAcademyTreeToSkillTree = (kTree: KhanAcademyTree<any>): SkillTreeNode => {
  return {
    ...kTree,
    title: kTree.title,
    content: kTree.url,
    children: kTree.children.map(KhanAcademyTreeToSkillTree),
    id: Math.random(),
  }
}
