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
