import { useEffect, useRef } from 'react';

/**
 * Makes the mobile back button close an open modal/overlay instead of
 * navigating away from the site entirely. Pushes a history entry while the
 * modal is open so the back button triggers a popstate we can intercept;
 * if the modal is closed by other means (X button, backdrop click), the
 * pushed entry is consumed with history.back() so it doesn't linger.
 */
export function useCloseOnBackButton(isOpen: boolean, onClose: () => void): void {
  const closedByBack = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ modalOpen: true }, '');
    closedByBack.current = false;

    const handlePopState = () => {
      closedByBack.current = true;
      onClose();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (!closedByBack.current) {
        window.history.back();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
}
