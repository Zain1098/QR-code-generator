import Link from 'next/link'
import { QrCode } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link href="/" className="flex justify-center items-center gap-2 group">
          <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
            <QrCode className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-zinc-900 dark:text-white">QRForge</span>
        </Link>
      </div>
      
      {children}
    </div>
  )
}
