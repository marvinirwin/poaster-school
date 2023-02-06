import React, {MouseEvent, useRef, useState} from "react";

export const useClosableModal = (
  {
    isOpen,
    setIsOpen
  }: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
  }
) => {
  const modalRef = useRef<HTMLElement>(null);

  const handleClickOutside = (event: React.SyntheticEvent<MouseEvent<HTMLElement>>) => {
    // @ts-ignore
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return {
    modalRef,
  }
}

