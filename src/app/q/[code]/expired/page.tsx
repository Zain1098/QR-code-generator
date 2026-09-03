import Link from 'next/link';

export default function ExpiredQRPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">This QR code has expired</h1>
        <p className="mb-6 text-gray-600">This QR code is no longer active.</p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
