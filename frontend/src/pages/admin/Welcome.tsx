/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4E1Yj2o9HJ1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Link } from "@chakra-ui/react";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] px-4 md:px-6 overflow-x-hidden">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">¡Bienvenidos a nuestra plataforma!</h1>
        <p className="text-gray-500 md:text-xl dark:text-gray-400">
        Descubra el poder de nuestras herramientas y servicios de vanguardia. Comience hoy y libere todo su potencial.        </p>
        <Link
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          
        >
         Empecemos ! 
        </Link>
      </div>
    </div>
  )
}