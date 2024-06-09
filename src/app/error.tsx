'use client'

import { useEffect } from "react"

// エラー画面
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <div className="text-center text-5xl font-bold mb-3">500</div>
      <div className="text-center text-xl font-bold">Server Error</div>
      <div className="text-center text-sm font-bold">{error.cause && error.cause as any}</div>
      <div className="text-center text-sm font-bold">{error.digest && error.digest}</div>
      <button
        className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

export default Error