import { useState } from 'react'
import { Modal } from './components/Modal'
import { UncontrolledForm } from './components/forms/UncontrolledForm/UncontrolledForm'
import { MainPage } from './pages/MainPage'
import { ReactHookForm } from './components/forms/RHFForm/RHFForm'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenRHF, setIsOpenRHF] = useState(false)

  return (
    <div>
      <MainPage/>
      <h1>Forms</h1>
      <button onClick={() => setIsOpen(true)}>Open form</button>
      <button onClick={() => setIsOpenRHF(true)}>Open RHR form</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UncontrolledForm onClose={() => setIsOpen(false)}/>
      </Modal>

      <Modal isOpen={isOpenRHF} onClose={() => setIsOpenRHF(false)}>
        <ReactHookForm onClose={() => setIsOpenRHF(false)}/>
      </Modal>
    </div>
  )
}
export default App
