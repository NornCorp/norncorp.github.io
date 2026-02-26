'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem('norncorp-cookie-consent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('norncorp-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('norncorp-cookie-consent', 'rejected')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col justify-between gap-x-8 gap-y-4 border-t border-white/10 bg-norn-darker p-6 shadow-lg md:flex-row md:items-center lg:px-8">
      <p className="max-w-4xl text-sm/6 text-white">
        We use cookies to enhance your experience, analyze site traffic, and ensure the security of our platform.
        By continuing to use NornCorp, you agree to our use of cookies. See our{' '}
        <a
          href="#"
          className="font-semibold text-norn-green hover:text-norn-green-light"
        >
          privacy policy
        </a>
        {' '}for more details.
      </p>
      <div className="flex flex-none items-center gap-x-5">
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-md bg-norn-green px-3 py-2 text-sm font-semibold text-norn-dark shadow-xs hover:bg-norn-green-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-norn-green"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={handleReject}
          className="text-sm/6 font-semibold text-gray-300 hover:text-white"
        >
          Reject all
        </button>
      </div>
    </div>
  )
}
