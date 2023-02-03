import {SkillTreeNode} from "../components/SkillTree";
import {camelCase} from 'lodash';

interface CollinsTreeNode {
  title: string;
  children?: CollinsTreeNode[];
}

export const CollinsTreeToSkillTree = (t: CollinsTreeNode): SkillTreeNode => {
  return {
    ...t,
    children: t.children?.map(CollinsTreeToSkillTree) || [],
    id: camelCase(t.title),
    content: ""
  }
}
export const CollinsTree: CollinsTreeNode = {
  title: "Spoken Language",
  children:
    [
      {
        title: "General Language Mastery",
        children: [
          {
            title: "Grammar",
            children: [
              {title: "Basic speech components"},
              {title: "Nouns"},
              {title: "Pronouns"},
              {title: "Verbs"},
              {title: "Adjectives"},
              {title: "Adverbs / modifiers"},
              {title: "Prepositions"},
              {title: "Conjunctions"},
              {title: "Interjections"},
              {
                title: "Basic sentence structure",
                children: [
                  {title: "Sentence Fragments"},
                  {title: "Run-on Sentences and Comma Splices"},
                  {title: "Sentence Type and Purpose"},
                  {title: "Independent and Dependent Clauses: Coordination and Subordination"},
                  {title: "Subject Verb Agreement"},
                  {title: "Consistent Verb Tense"},
                  {title: "Component agreement"},
                  {title: "Advanced component use"},
                  {title: "Poor component use"},
                  {title: "Incomplete sentences"},
                  {title: "Avoiding Modifier Problems"},
                  {title: "Misplaced and dangling modifiers"},
                  {title: "Punctuation"},
                  {title: "Proper punctuation"},
                  {title: "Poor punctuation use"},
                  {title: "Run-on sentences"},
                  {title: "Sentence fragments"},
                  {title: "Capitalization"},
                  {title: "Proper capitalization"},
                  {title: "Capitalization in titles"},
                ],
              },
              {
                title: "Advanced grammar",
                children: [
                  {title: "Who vs. whom"},
                  {title: "Ending sentences with prepositions"},
                  {title: "Irregular verbs"},
                  {title: "Transitions"},
                  {title: "Would, Should, Could"},
                  {title: "Achieving Parallelism"},
                  {title: "Definite and Indefinite Articles"},
                  {title: "Two-Word Verbs"},
                  {title: "Other Phrases: Verbal, Appositive, Absolute"},
                  {title: "Pronoun Reference"},
                  {title: "Relative Pronouns: Restrictive and Nonrestrictive Clauses"},
                ],
              },
            ],
          },
          {
            title: "Speaking", children: [
              {title: "Pronunciation"},
              {title: "Enunciation"},
              {title: "Capturing attention"},
              {title: "Evaluating audiences"},
              {title: "Leveraging body language"},
              {title: "Projection"},
              {title: "Speaking succinctly"},
              {title: "Use of speaking aids"},
              {title: "Presentations"},
              {title: "Videos"},
              {title: "Microphones"},
              {title: "Props"},
            ]
          },
          {
            title: "Listening", children: [
              {title: "Signaling comprehension"},
              {title: "Asking questions"},
              {title: "Engaging in conversations"},
              {title: "Preparing for conversations"},
              {title: "Evaluating partners"},
              {title: "Setting goals"},
              {title: "Moderating conversations"},
              {title: "Setting expectations"},
              {title: "Setting ground rules"},
              {title: "Maintaining focus"},
              {title: "Successful engagement"},
              {title: "Citing evidence and examples"},
              {title: "Acknowledging and referring to others"},
              {title: "Succinct responses"},
            ]
          },
          {
            title: "Language tools", children: [
              {title: "Figurative language"},
              {title: "Denotation vs. connotation"},
              {title: "Satire"},
              {title: "Irony"},
              {title: "Understatement"},
              {title: "Analogies"},
              {title: "Comparisons"},
            ]
          },
          {
            title: "Foreign Languages", children: [
              {title: "English"},
              {title: "Mandarin"},
              {title: "Hindi"},
              {title: "Spanish"},
              {title: "French"},
              {title: "Arabic"},
              {title: "Bengali"},
              {title: "Russian"},
            ]
          },
          {
            title: "Advanced linguistics",
            children: [
              {title: "Phonetics and phonology"},
              {title: "Morphology, grammar and syntax"},
              {title: "Semantics and philosophy of language"},
              {
                title: "Linguistic typology and comparative linguistics"
              },
              {
                title: "Dialectology, linguistic geography, sociolinguistic"
              },
              {title: "Lexicon and lexicography"},
              {title: "Psycholinguistics and neurolinguistics"},
              {
                title: "Computational linguistics and philology"
              },
              {title: "Linguistic statistics"},
              {title: "Language teaching and acquisition"},
              {title: "Translation studies"}
            ]
          }
        ]
      },
      {
        title: "Written Language",
        children: [
          {
            title: "Fiction",
            children: [
              {title: "Writing fiction"},
              {title: "Understanding your nonfiction audience"},
              {title: "Understanding your nonfiction genre"},
              {title: "Leveraging important components of fiction"},
              {title: "Plot"},
              {title: "Characters"},
              {title: "Character Development"},
              {title: "Setting"},
              {title: "Mood"},
              {title: "Style of Writing/Language/Dialects used"},
              {title: "Tone"},
              {
                title: "Iterative testing and feedback collection of fiction"
              },
              {title: "Reading and evaluating fiction"},
              {title: "Comprehending fiction"},
              {title: "Summarizing fiction"},
              {
                title: "Using textual evidence to support analysis of texts"
              },
              {title: "Drawing inferences from fiction"},
              {title: "Identifying themes in fiction"},
              {
                title:
                  "Identifying themes/central ideas and describing their development"
              },
              {title: "Criticizing fiction"},
              {
                title: "Analyzing and criticizing authors’ choices"
              },
              {
                title:
                  "Analyzing multiple interpretations of texts (e.g., movie vs. book)"
              },
              {
                title: "Major fiction genres",
                children: [
                  {title: "Poetry"},
                  {title: "Fantasy"},
                  {title: "Mystery"},
                  {title: "Science fiction"},
                  {title: "Historical fiction"},
                  {title: "Contemporary fiction"},
                  {title: "Fan fiction"}
                ]
              }
            ]
          },
          {
            title: "Nonfiction",
            children: [
              {
                title: "Writing nonfiction",
                children: [
                  {
                    title: "Understanding your nonfiction audience",
                  },
                  {
                    title: "Nonfiction writing tools",
                  },
                  {
                    title: "Examples",
                  },
                  {
                    title: "Anecdotes",
                  },
                  {
                    title: "Comparisons",
                  },
                  {
                    title: "Analogies",
                  },
                  {
                    title: "Categorization",
                  },
                  {
                    title: "Scientific / technical texts",
                  },
                  {
                    title: "Informational texts",
                  },
                  {
                    title: "Investigative / journalistic texts",
                  },
                  {
                    title: "Sales / business texts",
                  },
                  {
                    title: "Iterative testing and feedback collection of nonfiction",
                  },
                ],
              },
              {
                title: "Reading and evaluating nonfiction",
                children: [
                  {
                    title: "Comprehending nonfiction",
                  },
                  {
                    title: "Identifying key information",
                  },
                  {
                    title: "Summarizing nonfiction",
                  },
                  {
                    title: "Using textual evidence to support analysis of texts",
                  },
                  {
                    title: "Separating facts from opinions",
                  },
                  {
                    title: "Drawing inferences from nonfiction",
                  },
                  {
                    title: "Separating explicit and implicit claims",
                  },
                  {
                    title: "Criticizing nonfiction",
                  },
                  {
                    title: "Determining an author’s points of view",
                  },
                  {
                    title: "Determining an author’s strength of argument",
                  },
                  {
                    title: "Analyzing written structure for effectiveness",
                  },
                  {
                    title: "Analyzing authors’ regard for contradictory evidence",
                  },
                  {
                    title: "Identifying core points of disagreement among opposing views",
                  },
                  {
                    title: "Analyzing logical consistency",
                  },
                  {
                    title: "Analyzing rigor",
                  },
                  {
                    title: "Analyzing citations",
                  },
                ],
              },
            ]
          },
        ]
      },
    ]
}





