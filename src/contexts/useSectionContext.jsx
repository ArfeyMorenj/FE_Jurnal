import React, { createContext, useContext, useState } from 'react'

const SectionContext = createContext(null)

export const SectionProvider = ({ children }) => {
  const [currentSectionId, setCurrentSectionId] = useState(null)
  const [sectionData, setSectionData] = useState({})

  const setSectionWithId = (sectionId, additionalData = {}) => {
    setCurrentSectionId(sectionId)
    setSectionData(prev => ({
      ...prev,
      [sectionId]: additionalData
    }))
  }

  const getSectionData = (sectionId) => {
    return sectionData[sectionId] || null
  }

  const clearSection = () => {
    setCurrentSectionId(null)
  }

  return (
    <SectionContext.Provider 
      value={{ 
        currentSectionId, 
        setSectionWithId, 
        getSectionData,
        clearSection,
        sectionData
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}

// Hook untuk menggunakan Section Context
export const useSectionContext = () => {
  const context = useContext(SectionContext)
  if (!context) {
    throw new Error('useSectionContext must be used within SectionProvider')
  }
  return context
}