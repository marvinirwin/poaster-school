import React from "react";

export const classNames = (...classNames: (string | null | undefined)[]) => classNames.filter(Boolean).join(' ')

export type TreeNodeProps = { title: string, isExpanded: boolean, onExpandToggled: (newState: boolean) => void }
  & React.HTMLProps<HTMLDivElement>;

const TreeNode: React.FC<TreeNodeProps> = (
  {
    title,
    isExpanded,
    onExpandToggled,
    className,
    ...divProps
  }) => {
  return (
    <div
      className={
        classNames(
          className,
          "max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-col items-center flex"
        )
      }
      {...divProps}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white m-1 inline-block">{title}</h5>
      <div className={'w-full flex'}>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l flex-grow"
          onClick={() => {
            onExpandToggled(!isExpanded)
          }}
        >
          {isExpanded ? 'Close' : 'Open'}
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r flex-grow"
          onClick={() => {
          }}
        >
          Content
        </button>
      </div>
    </div>
  );
};
export default TreeNode;
