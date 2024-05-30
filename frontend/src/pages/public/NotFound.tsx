import { Link } from "@chakra-ui/react";


export default function NotFound() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-8xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">404</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Lo sentimos, la página que buscas no se ha encontrado.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/login"
        >
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  )
}