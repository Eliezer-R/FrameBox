function RemoveOrAdd ({ textAddOrRemove, plusOrMinImg }) {
  return (
    <div className='remove-or-add-container'>
      <img src={plusOrMinImg} alt='plusAndMin' />
      <span>{textAddOrRemove}</span>
    </div>
  )
}
export default RemoveOrAdd
