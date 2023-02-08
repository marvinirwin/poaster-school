import React from "react";

export const MarkIncompleteButton = ({onClick}: { onClick: () => void }) => <button
  type="button"
  className={
    `text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`
  }
  onClick={onClick}
>
  Set Incomplete
</button>;
