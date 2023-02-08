import React, {useState} from "react";
import {MarkIncompleteButton} from "./MarkIncompleteButton";
import {MarkCompleteButton} from "./MarkCompleteButton";

export enum SubjectStatuses {
  complete = 'complete',
  incomplete = 'incomplete'
}

export const classNames = (...classNames: (string | null | undefined)[]) => classNames.filter(Boolean).join(' ')

export type TreeNodeProps = {
    canExpand: boolean;
    title: string,
    isExpanded: boolean,
    onExpandToggled: (newState: boolean) => void
    status: string
    onStatusChanged: (newStatus: string) => void
    onShowContent: () => void
  }
  & React.HTMLProps<HTMLDivElement>;

const CompletedCheck = () => <div
  className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
  <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor"
       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"></path>
  </svg>
  <span className="sr-only">Completed</span>
</div>;
const IncompleteCross = () => <div
  className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 p-2 flex items-center justify-center mx-auto mb-3.5">
  <svg aria-hidden="true" className="w-8 h-8 text-red-500 dark:text-red-400" fill="currentColor"
       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <g id="cross">
      <line x1="2" y1="2" x2="98" y2="98"></line>
      <line x1="98" y1="2" x2="2" y2="98"></line>
    </g>
    <path fillRule="evenodd"
          d=""
          clipRule="evenodd"></path>
  </svg>
  <span className="sr-only">Completed</span>
</div>;

const TreeNode: React.FC<TreeNodeProps> = (
  {
    title,
    isExpanded,
    onExpandToggled,
    className,
    status,
    onStatusChanged,
    onShowContent,
    canExpand,
    ...divProps
  }) => {

  const isCompleted = status === SubjectStatuses.complete;
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  return <div
    className={
      classNames("relative p-4 h-full md:h-auto", className)
    }
    ref={setRef}
    {...divProps}
  >
    <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
      {
        isCompleted ? <MarkIncompleteButton
            onClick={() => {
              onStatusChanged(isCompleted ? '' : SubjectStatuses.complete)
            }}
          /> :
          <MarkCompleteButton
            onClick={
              () => {
                onStatusChanged(isCompleted ? '' : SubjectStatuses.complete)
              }
            }
          />
      }
      <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
      <div>
        <button type="button"
                className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
                onClick={() => {
                  onExpandToggled(!isExpanded);
                  setTimeout(() => {
                    ref && ref.scrollIntoView({behavior: "smooth", block: "center", inline: 'center'});
                  }, 1000)
                }}
        >
          {isExpanded ? 'Close' : 'Expand'}
        </button>
        <button
          className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
          onClick={() => {
            onShowContent()
          }}
        >
          Content
        </button>
      </div>
    </div>
  </div>;
  return (
    <div
      ref={setRef}
      className={
        classNames(
          className,
          "max-w-sm bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 flex-col items-center flex"
        )
      }
      {...divProps}
    >
      <h6 className="text-l font-bold tracking-tight text-gray-900 dark:text-white m-1 inline-block">{title}</h6>
      <div>
      </div>
      <div className={'w-full flex'}>
        {
          canExpand ? <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 flex-grow"
            onClick={() => {
              onExpandToggled(!isExpanded);
              setTimeout(() => {
                ref && ref.scrollIntoView({behavior: "smooth", block: "center", inline: 'center'});
              }, 1000)
            }}
          >
            {isExpanded ? 'Close' : 'Open'}
          </button> : null
        }
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 flex-grow"
          onClick={() => {
            onShowContent()
          }}
        >
          Content
        </button>
        {
          isCompleted ? <MarkIncompleteButton
              onClick={() => {
                onStatusChanged(isCompleted ? '' : SubjectStatuses.complete)
              }}
            /> :
            <MarkCompleteButton
              onClick={
                () => {
                  onStatusChanged(isCompleted ? '' : SubjectStatuses.complete)
                }
              }
            />
        }
      </div>
    </div>
  );
};
export default TreeNode;
