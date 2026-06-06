import { useState } from 'react'
import { Modal } from './components/Modal'
import { UncontrolledForm } from './components/forms/UncontrolledForm/UncontrolledForm'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <h1>Forms</h1>
      <button onClick={() => setIsOpen(true)}>Open form</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UncontrolledForm onClose={() => setIsOpen(false)}/>
      </Modal>
    </div>
  )
}
export default App
