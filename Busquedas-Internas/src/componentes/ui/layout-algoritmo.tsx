import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AlgorithmLayoutProps {
  title: string
  description: string
  inputSection: ReactNode
  resultSection: ReactNode
}

export function AlgorithmLayout({ title, description, inputSection, resultSection }: AlgorithmLayoutProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Datos de entrada</CardTitle>
          </CardHeader>
          <CardContent>{inputSection}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>
          <CardContent>{resultSection}</CardContent>
        </Card>
      </div>
    </div>
  )
}

