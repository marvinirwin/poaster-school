import React, {useEffect, useState} from "react";
import DOMPurify from 'dompurify';
import {marked} from "marked";
import MDEditor from '@uiw/react-md-editor';
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
  onClose: () => void
};

export const SkillModal: React.FC<SkillModalProps> = (
  {
    title,
    content,
    setContent,
    canEdit,
    topicFrames,
    onClose
  }
) => {
  const [isEditing, setIsEditing] = useState<boolean>(canEdit ? !content : false);
  const [editableContent, setEditableContent] = useState<string | undefined>(content);
  useEffect(() => {
    setEditableContent(content)
  }, [content])
  return <div
    tabIndex={-1}
    className="fixed top-0 left-0 right-0 z-50  inset-0 h-modal h-full prose"
  >
    <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-full h-full p-4 overflow-x-auto overflow-y-auto">
      <div className="flex items-center justify-between border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <span>
          {
            isEditing ?
              <>
                <button
                  disabled={content === editableContent}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setContent(editableContent || "")}
                >Save
                </button>
                <button
                  type="button"
                  className="ml-4 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={
                    () => {
                      setEditableContent(content);
                      setIsEditing(false)
                    }
                  }
                >
                  Cancel
                </button>
              </>
              : null
          }
          {
            (canEdit && !isEditing) ? <button
                type="button"
                disabled={isEditing}
                className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsEditing(true)}
              > Edit
              </button>
              : null
          }
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg ml-4"
            onClick={onClose}
          > Close
            </button>
          </span>
      </div>
      {
        !isEditing ? <div
          className=""
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(content)) || `<pre>There is no subject information here.  Please add some, or ask an editor to add some</pre>`
          }}/> : null
      }
      {
        isEditing ?
          <div className="p-5">
            <MDEditor
              value={editableContent}
              onChange={setEditableContent}
              // TODO change height to be relative to the screen size or something
              height={500}
            />
            {/*
              <MDEditor.Markdown
                source={editableContent}
                style={{whiteSpace: 'pre-wrap'}}
              />
*/}
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
  </div>
}
