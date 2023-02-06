import React from "react";

export const classNames = (...classNames: (string | null | undefined)[]) => classNames.filter(Boolean).join(' ')

export type TreeNodeProps = {
    title: string,
    isExpanded: boolean,
    onExpandToggled: (newState: boolean) => void
    status: string
    onStatusChanged: (newStatus: string) => void
    onShowContent: () => void
  }
  & React.HTMLProps<HTMLDivElement>;

function MarkIncompleteButton(props: { onClick: () => void, completed: boolean }) {
  return <button
    type="button"
    className={
      `text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`
    }
    onClick={props.onClick}
  >
    {props.completed ? "Set Complete" : "Set Incomplete"}
  </button>;
}

function MarkCompleteButton(props: { onClick: () => void, completed: boolean }) {
  return <button
    type="button"
    className={
      `text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`
    }
    onClick={props.onClick}
  >
    {props.completed ? "Set Complete" : "Set Incomplete"}
  </button>;
}

const TreeNode: React.FC<TreeNodeProps> = (
  {
    title,
    isExpanded,
    onExpandToggled,
    className,
    status,
    onStatusChanged,
    onShowContent,
    ...divProps
  }) => {
  const isCompleted = status === 'completed';
  const statusColor = isCompleted ? 'green' : 'red'
  return (
    <div
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
        {
          isCompleted ? <MarkIncompleteButton
              onClick={() => {
                onStatusChanged(isCompleted ? '' : 'complete')
              }}
              completed={isCompleted}/> :
            <MarkCompleteButton
              onClick={
                () => {
                  onStatusChanged(isCompleted ? '' : 'complete')
                }
              }
              completed={isCompleted}
            />
        }
      </div>
      <div className={'w-full flex'}>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 flex-grow"
          onClick={() => {
            onExpandToggled(!isExpanded)
          }}
        >
          {isExpanded ? 'Close' : 'Open'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 flex-grow"
          onClick={() => {
            onShowContent()
          }}
        >
          Content
        </button>
      </div>
    </div>
  );
};
export default TreeNode;
