"use client"

import { useState } from "react"
import { AlgorithmLayout } from "@/componentes/ui/layout-algoritmo"
import { ErrorModal } from "@/componentes/ui/error-modal";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function HashModulo() {
  const [key, setKey] = useState("")
  const [tableSize, setTableSize] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [formula, setFormula] = useState("")
  const [error, setError] = useState({ show: false, title: "", message: "" })

  const calculateHash = () => {
    if (!key.trim()) {
      setError({
        show: true,
        title: "Error de validación",
        message: "Por favor ingrese una clave.",
      })
      return
    }

    if (!/^\d+$/.test(key)) {
      setError({
        show: true,
        title: "Error de formato",
        message: "La clave debe ser un número entero positivo.",
      })
      return
    }

    const parsedSize = Number.parseInt(tableSize)
    if (isNaN(parsedSize) || parsedSize <= 0) {
      setError({
        show: true,
        title: "Error de validación",
        message: "El tamaño de la tabla debe ser un número entero positivo.",
      })
      return
    }

    const parsedKey = Number.parseInt(key)
    const hashValue = parsedKey % parsedSize
    const hashPosition = hashValue + 1 // Position starts at 1

    setResult(hashPosition)
    setFormula(`h(${parsedKey}) = ${parsedKey} mod ${parsedSize} + 1 = ${hashValue} + 1 = ${hashPosition}`)
  }

  const handleReset = () => {
    setKey("")
    setTableSize("")
    setResult(null)
    setFormula("")
  }

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="key">Clave (número entero)</Label>
        <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="123" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tableSize">Tamaño de la tabla</Label>
        <Input id="tableSize" value={tableSize} onChange={(e) => setTableSize(e.target.value)} placeholder="10" />
      </div>
      <div className="flex gap-2">
        <Button onClick={calculateHash}>Calcular</Button>
        <Button variant="outline" onClick={handleReset} disabled={!key && !tableSize}>
          Reiniciar
        </Button>
      </div>
    </div>
  )

  const resultSection = (
    <div className="space-y-4">
      {result !== null ? (
        <>
          <div className="p-4 border rounded bg-muted/50">
            <h3 className="font-medium mb-2">Fórmula aplicada:</h3>
            <p className="font-mono text-sm">{formula}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Posición en la tabla hash:</p>
            <p className="text-3xl font-bold text-primary mt-2">{result}</p>
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground">
          Ingrese los datos y presione "Calcular" para obtener el resultado.
        </div>
      )}
    </div>
  )

  return (
    <>
      <AlgorithmLayout
        title="Método Hash Módulo"
        description="El método hash módulo calcula la posición en la tabla hash utilizando el operador módulo: h(clave) = clave mod número_elementos + 1"
        inputSection={inputSection}
        resultSection={resultSection}
      />
      <ErrorModal
        isOpen={error.show}
        onClose={() => setError({ ...error, show: false })}
        title={error.title}
        message={error.message}
      />
    </>
  )
}

