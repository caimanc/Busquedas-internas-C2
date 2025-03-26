import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Search, Binary, Hash, Square, FolderSymlink, Scissors } from "lucide-react"

const algorithms = [
  {
    title: "Búsqueda Lineal",
    description: "Algoritmo que recorre secuencialmente cada elemento hasta encontrar el valor buscado.",
    icon: Search,
    href: "/busqueda-lineal",
  },
  {
    title: "Búsqueda Binaria",
    description: "Algoritmo que divide repetidamente a la mitad el espacio de búsqueda para encontrar un valor.",
    icon: Binary,
    href: "/busqueda-binaria",
  },
  {
    title: "Método Hash Módulo",
    description: "Función hash que utiliza el operador módulo para calcular la posición.",
    icon: Hash,
    href: "/hash-modulo",
  },
  {
    title: "Método Hash Cuadrado",
    description: "Función hash que eleva al cuadrado la clave y extrae dígitos centrales.",
    icon: Square,
    href: "/hash-cuadrado",
  },
  {
    title: "Método Hash por Plegamiento",
    description: "Función hash que divide la clave en partes y las combina mediante sumas.",
    icon: FolderSymlink,
    href: "/hash-plegamiento",
  },
  {
    title: "Método Hash por Truncamiento",
    description: "Función hash que selecciona y utiliza solo ciertos dígitos de la clave.",
    icon: Scissors,
    href: "/hash-truncamiento",
  },
]

export function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Algoritmos de Búsqueda y Métodos Hash</h2>
        <p className="text-muted-foreground mt-2">
          Selecciona un algoritmo para visualizar su funcionamiento paso a paso
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {algorithms.map((algorithm) => (
          <Link href={algorithm.href} key={algorithm.title} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-2">
                <algorithm.icon className="h-5 w-5" />
                <CardTitle>{algorithm.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{algorithm.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

