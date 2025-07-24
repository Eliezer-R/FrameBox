import useHandleMethods from '../hooks/logicModalCollection'
function ModalColletion ({ setOpenModal, setColletions }) {
  const { handleBtnSave, handleInputChange, collectionName } = useHandleMethods({ setOpenModal, setColletions })

  return (
    <div className='modal-content'>
      <div className='header-modal-content'>
        <h2>Add colletion</h2>
        <input
          type='text'
          id='text-modal'
          name='modal-text'
          value={collectionName}
          onChange={handleInputChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleBtnSave()
            }
          }}
          autoFocus
        />
        <div className='content-btn-modal-colletion'>
          <button className='btn-modal-colletion' onClick={handleBtnSave}>Save</button>
          <button className='btn-modal-colletion' onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ModalColletion
