export type KhanAcademyTree<T extends {}> = {
  url:      string;
  title:    string;
  children: KhanAcademyTree<any>[];
} & Omit<T, 'url' | 'title' | 'children'>

export interface KhanAcademyTreeChild {
  title:        string;
  url:          string;
  subject:      string;
  description?: string;
  children:     PurpleChild[];
}

export interface PurpleChild {
  title?:       string;
  url?:         string;
  description?: string;
  kind:         StickyKind;
  children:     FluffyChild[];
  subject?:     Subject;
}

export interface FluffyChild {
  kind?:        TentacledKind;
  children:     TentacledChild[];
  title?:       string;
  url?:         string;
  description?: string;
}

export interface TentacledChild {
  title:        string;
  url?:         string;
  children:     StickyChild[];
  description?: string;
  kind?:        FluffyKind;
}

export interface StickyChild {
  title:    string;
  kind:     PurpleKind;
  children: any[];
}

export enum PurpleKind {
  Exercise = "Exercise",
}

export enum FluffyKind {
  Article = "Article",
  Interactive = "Interactive",
  Video = "Video",
}

export enum TentacledKind {
  Article = "Article",
  InterspersedQuiz = "InterspersedQuiz",
  KindVideo = "video",
  MasterySubjectProgressSummary = "MasterySubjectProgressSummary",
  SubjectPageTopicCard = "SubjectPageTopicCard",
  Video = "Video",
}

export enum StickyKind {
  ActionList = "ActionList",
  BrowseProjects = "BrowseProjects",
  ContentCarousel = "ContentCarousel",
  FeaturedContent = "FeaturedContent",
  SubjectIntro = "SubjectIntro",
  SubjectProgress = "SubjectProgress",
  TabFooter = "TabFooter",
  TopicProgress = "TopicProgress",

}

export interface Subject {
  title: string;
  url:   string;
}
