'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop fixed bg-black top-0 bottom-0 left-0 right-0 bg-opacity-70 flex justify-center items-center z-[100]">
        {/* <div className="h-full w-full bg-black" onClick={onDismiss}>
        </div> */}
        <dialog ref={dialogRef} className="modal w-[80%] max-w-[500px] h-auto max-h-[500px] rounded-xl" onClose={onDismiss}>
            {children}
            <button onClick={onDismiss} className="close-button absolute top-4 right-4 w-10 h-10 cursor-pointer bg-black" />
        </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}