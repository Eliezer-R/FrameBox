function Btn ({ img, text, clickAlternate }) {
  return (
    <div className='conteiner-btn' onClick={() => clickAlternate(true)}>
      <img src={img} alt='btn' />
      <span>{text} </span>
    </div>
  )
}

export default Btn
