import React from "react";

export const MarkCompleteButton = ({onClick}: { onClick: () => void }) => <button
  type="button"
  className={
    `text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`
  }
  onClick={onClick}
>
  Set Complete
</button>;
