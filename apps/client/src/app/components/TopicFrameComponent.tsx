import React, {useState} from "react";
import DOMPurify from "dompurify";
import {marked} from "marked";
import {TopicFrame} from "./SkillModal";

export const TopicFrameComponent = (
  {
    topicFrame: {
      body,
      target
    },
    isFirst
  }: {
    topicFrame: TopicFrame
    isFirst: boolean;
  }
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return <div>
    <h2 className={'m-0'}>
      <button
        type="button"
        onClick={() => {
          setIsOpen(isOpen => !isOpen)
        }}
        className={`flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 ${isFirst ?  'rounded-t-xl' : ''} focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800`}
      >
                  <span
                    className="flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"/></svg>
                    {`If you're interested in ${target}`}</span>
        <svg
          className="w-6 h-6 rotate-180 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </h2>
    {
      isOpen ?
        <div>
          <div
            className="p-5 font-light border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <div
              className="p-6 space-y-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(marked.parse(body))
              }}
            />
          </div>
        </div>
        : null
    }
  </div>;
};
