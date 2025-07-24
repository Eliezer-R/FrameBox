import { CollectionsProvider } from './contexts/CollectionsContext'
import { SearchProvider } from './contexts/SearchContext'

export const ImageProvider = ({ children }) => (
  <CollectionsProvider>
    <SearchProvider>
      {children}
    </SearchProvider>
  </CollectionsProvider>
)
