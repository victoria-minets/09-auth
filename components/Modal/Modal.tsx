'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; // робимо onClose необов’язковим
}

export default function Modal({ children, onClose }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const router = useRouter();

  // Контейнер для порталу
  useEffect(() => {
    setModalRoot(document.getElementById('modal-root'));
  }, []);

  // Закриття ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
        else router.back(); // якщо onClose немає — йдемо назад
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, router]);

  // Блокування скролу фону
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!modalRoot) return null;

  // Обробка кліку на фон
  const handleBackdropClick = () => {
    if (onClose) onClose();
    else router.back();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        {/* Кнопка для закриття */}
        {!onClose && (
          <button onClick={() => router.back()} className={css.backBtn}>
            Close
          </button>
        )}
      </div>
    </div>,
    modalRoot,
  );
}
