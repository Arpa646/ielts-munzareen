import { NextPageContext } from 'next'

interface ErrorProps {
  statusCode?: number
  hasGetInitialPropsRun?: boolean
  err?: Error
}

function Error({ statusCode, hasGetInitialPropsRun, err }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600 mb-4">
            {statusCode || 'Error'}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">
            {statusCode === 404
              ? 'This page could not be found.'
              : statusCode === 500
              ? 'Internal server error occurred.'
              : 'An error occurred on client.'}
          </p>
        </div>
        
        <div className="space-y-4">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </a>
          
          <button
            onClick={() => window.location.reload()}
            className="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error 