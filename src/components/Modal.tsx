import { useEffect, useRef, ReactElement } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactElement;
};

const Modal = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  if (!ref.current) ref.current = document.createElement('div');

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (modalRoot && ref.current) modalRoot.appendChild(ref.current);
    return () => {
      if (modalRoot && ref.current) modalRoot.removeChild(ref.current);
    };
  }, []);

  return createPortal(children, ref.current);
};

export default Modal;
