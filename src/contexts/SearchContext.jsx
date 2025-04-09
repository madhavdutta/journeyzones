import { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function useSearch() {
  return useContext(SearchContext)
}

export function SearchProvider({ children }) {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    dateRange: {
      startDate: null,
      endDate: null
    },
    travelers: 1,
    budget: [0, 5000],
    activities: []
  })

  const updateSearch = (newParams) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams
    }))
  }

  const resetSearch = () => {
    setSearchParams({
      destination: '',
      dateRange: {
        startDate: null,
        endDate: null
      },
      travelers: 1,
      budget: [0, 5000],
      activities: []
    })
  }

  const value = {
    searchParams,
    updateSearch,
    resetSearch
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}
