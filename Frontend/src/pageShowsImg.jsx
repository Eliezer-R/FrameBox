import useLogicPageShow from './hooks/logicPageShow'
import { useSearchContext } from './contexts/SearchContext'

// Page to search for images
function PageShowsImg () {
  const { searchValueOfTheInput, loading, data } = useSearchContext()
  const { handleInputChange, handleClick } = useLogicPageShow()
  const dataLength = loading || data.length === 0

  return (
    <div className='shows-img-content'>
      <div className='shows-img-input-search'>
        <img src='/resources/gradiend-bg@2x.png' alt='gradientImg' />
        <div className='content-input'>
          <input
            type='text'
            id='search-input'
            name='search'
            data-testid='input-search'
            value={searchValueOfTheInput}
            onChange={handleInputChange}
            autoFocus
          />
        </div>
      </div>

      {dataLength
        ? (
          <div className='not-found'>
            <img src='/resources/Loading2.gif' alt='loading' />
          </div>
          )
        : (
          <div className='content-search-images'>
            {data.length > 0 && data.map((dat) => {
              return (
                <div className='content-img' key={dat.id} onClick={() => handleClick({ dat })}>
                  <img src={dat.urls.small} alt='UnsplashImg' className='UnPlashImg' loading='lazy'/>
                </div>
              )
            })}
          </div>
          )}
    </div>
  )
}

export default PageShowsImg
