import React, { useEffect, useRef, useCallback } from 'react'
import styles from './styles.module.css'
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
