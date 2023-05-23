import React, { useEffect, useRef, useCallback } from 'react'
import './index.css'

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
    <div className='modal-overlay'>
      <div className='modal' ref={ref}>
        <button className='modal-close' onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default TestModal
