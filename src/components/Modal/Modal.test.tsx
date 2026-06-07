import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from './Modal'
import { describe, it, expect } from 'vitest'
import { vi } from 'vitest'
import { beforeEach, afterEach } from 'vitest'

describe('Modal', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) document.body.removeChild(modalRoot)
  })
  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    )
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Modal content</p>
      </Modal>
    )
    expect(screen.queryByText('Modal content')).toBeInTheDocument()
  })

  it('should call onClose when ESC is pressed', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal content</p>
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
