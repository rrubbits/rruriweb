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
    <div className="modal-backdrop fixed bg-black top-0 bottom-0 left-0 right-0 bg-opacity-70 flex justify-center items-center z-[100]" onClick={onDismiss}>
        <dialog ref={dialogRef} className="modal fixed flex flex-col w-[80%] max-w-[500px] rounded-xl h-[80%]" onClose={onDismiss}>
           <div className="flex-1 p-4 -z-50 bg-gray-100" onClick={(event) => event.stopPropagation()}>
               {children}
            </div>
            {/* <div className="flex-auto bg-black">
              test
            </div> */}
            {/* <button onClick={onDismiss}> */}
            {/* </button> */}
            <button className="close-button absolute top-4 right-4 w-10 h-10 cursor-pointer bg-opacity-50 bg-slate-500"/>
        </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}