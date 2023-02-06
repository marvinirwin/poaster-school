import React, {useEffect, useState} from "react";
import DOMPurify from 'dompurify';
import {marked} from "marked";
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import {TopicFrameComponent} from "./TopicFrameComponent";

export type TopicFrame = {
  target: string;
  body: string;
}

type SkillModalProps = {
  content: string,
  title: string,
  setContent: (newContent: string) => void,
  canEdit: boolean
  topicFrames: TopicFrame[]
};

export const SkillModal: React.FC<SkillModalProps> = (
  {
    title,
    content,
    setContent,
    canEdit,
    topicFrames
  }
) => {
  const [isEditing, setIsEditing] = useState<boolean>(canEdit ? !content : false);
  const [editableContent, setEditableContent] = useState<string | undefined>(content);
  useEffect(() => {
    setEditableContent(content)
  }, [content])
  return <div
    id="extralarge-modal"
    tabIndex={-1}
    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  >
    <div className="relative w-full h-full max-w-7xl md:h-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between border-b rounded-t dark:border-gray-600 p-5">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {
            canEdit ? <button
                data-modal-hide="defaultModal"
                type="button"
                disabled={isEditing}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              > Edit
              </button>
              : null
          }
        </div>
        {
          !isEditing ? <div className="p-5 space-y-6" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(content)) || `<pre>There is no subject information here.  Please add some, or ask an editor to add some</pre>`
          }}/> : null
        }
        {
          isEditing ?
            <div className="container p-5">
              <MDEditor
                value={editableContent}
                onChange={setEditableContent}
              />
              <MDEditor.Markdown
                source={editableContent}
                style={{whiteSpace: 'pre-wrap'}}
              />
            </div>
            : null
        }
      </div>
      <div>
        {
          topicFrames.map(topicFrame => {
            return <TopicFrameComponent topicFrame={topicFrame}/>
          })
        }
      </div>
      {
        isEditing ?
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              disabled={content === editableContent}
              data-modal-hide="extralarge-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setContent(editableContent || "")}
            >Save
            </button>
            <button
              data-modal-hide="extralarge-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={
                () => {
                  setEditableContent(content);
                  setIsEditing(false)
                }
              }
            >
              Cancel
            </button>
          </div>
          : null
      }

    </div>
  </div>
}
