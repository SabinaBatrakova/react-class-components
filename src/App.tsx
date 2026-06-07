import { useState } from 'react'
import { Modal } from './components/Modal'
import { UncontrolledForm } from './components/forms/UncontrolledForm/UncontrolledForm'
import { MainPage } from './pages/MainPage'
import { ReactHookForm } from './components/forms/RHFForm/RHFForm'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenRHF, setIsOpenRHF] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-8 ">
      <MainPage />
      <h1 className="text-3xl font-bold text-primary mb-6">Forms</h1>
      <div className="flex gap-4 mb-8">
      <button onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">Open form</button>
      <button onClick={() => setIsOpenRHF(true)}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark" >Open RHR form</button>
        </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <UncontrolledForm onClose={() => setIsOpen(false)} />
      </Modal>

      <Modal isOpen={isOpenRHF} onClose={() => setIsOpenRHF(false)}>
        <ReactHookForm onClose={() => setIsOpenRHF(false)} />
      </Modal>
    </div>
  )
}
export default App
