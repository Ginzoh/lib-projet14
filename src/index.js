import React, { useEffect, useRef, useCallback } from 'react'
import styles from './styles.module.css'

/**
 * TestModal component.
 *
 * @component
 * @param {Object} props The component props.
 * @param {boolean} props.isOpen A boolean indicating whether the modal is open.
 * @param {ReactNode} props.children The content to be rendered inside the modal.
 * @param {function} props.onClose A function to call when the modal needs to be closed.
 *
 * @example
 * return (
 *   <TestModal isOpen={modalOpen} onClose={closeModal}>
 *     <p>Modal content goes here...</p>
 *   </TestModal>
 * );
 */

const TestModal = ({ isOpen, children, onClose }) => {
  const ref = useRef(null)

  const clickListener = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', clickListener)
    }

    return () => {
      document.removeEventListener('mousedown', clickListener)
    }
  }, [isOpen, clickListener])

  if (!isOpen) return null

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles.modal} ref={ref}>
        <button className={styles['modal-close']} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default TestModal
