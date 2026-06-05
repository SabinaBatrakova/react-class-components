import { useState } from 'react'
import { Modal } from './components/Modal'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <h1>Forms</h1>
      <button onClick={() => setIsOpen(true)}>Open form</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal!</h2>
      </Modal>
    </div>
  )
}
export default App
