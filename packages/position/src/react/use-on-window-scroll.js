import React from 'react'

import useDebounceCallback from './use-debounce-callback.js'

export default function useOnWindowScroll(handler) {
  const handleScroll = useDebounceCallback(handler, 10)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
}
