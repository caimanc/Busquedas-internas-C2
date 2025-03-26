"use client"

import { useState } from "react"
import { AlgorithmLayout } from "@/componentes/ui/layout-algoritmo"
import { ErrorModal } from "@/componentes/ui/error-modal";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function HashFolding() {
  const [key, setKey] = useState("")
  const [partSize, setPartSize] = useState("")
  const [tableSize, setTableSize] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [steps, setSteps] = useState<string[]>([])
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

    const parsedPartSize = Number.parseInt(partSize)
    if (isNaN(parsedPartSize) || parsedPartSize <= 0) {
      setError({
        show: true,
        title: "Error de validación",
        message: "El tamaño de las partes debe ser un número entero positivo.",
      })
      return
    }

    const parsedTableSize = Number.parseInt(tableSize)
    if (isNaN(parsedTableSize) || parsedTableSize <= 0) {
      setError({
        show: true,
        title: "Error de validación",
        message: "El tamaño de la tabla debe ser un número entero positivo.",
      })
      return
    }

    // Divide the key into parts
    const newSteps = [`1. Dividir la clave ${key} en partes de ${parsedPartSize} dígitos:`]
    const parts: number[] = []

    for (let i = 0; i < key.length; i += parsedPartSize) {
      const part = key.substring(i, Math.min(i + parsedPartSize, key.length))
      parts.push(Number.parseInt(part))
    }

    newSteps.push(`   Partes: ${parts.join(", ")}`)

    // Sum all parts
    const sum = parts.reduce((acc, curr) => acc + curr, 0)
    newSteps.push(`2. Sumar todas las partes: ${parts.join(" + ")} = ${sum}`)

    // Apply modulo
    const hashValue = sum % parsedTableSize
    newSteps.push(`3. Aplicar módulo: ${sum} mod ${parsedTableSize} = ${hashValue}`)

    // Adjust to base 1 position
    const hashPosition = hashValue + 1
    newSteps.push(`4. Ajustar a posición base 1: ${hashValue} + 1 = ${hashPosition}`)

    setSteps(newSteps)
    setResult(hashPosition)
  }

  const handleReset = () => {
    setKey("")
    setPartSize("")
    setTableSize("")
    setResult(null)
    setSteps([])
  }

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="key">Clave (número entero)</Label>
        <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="123456789" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="partSize">Tamaño de las partes</Label>
        <Input id="partSize" value={partSize} onChange={(e) => setPartSize(e.target.value)} placeholder="2" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tableSize">Tamaño de la tabla</Label>
        <Input id="tableSize" value={tableSize} onChange={(e) => setTableSize(e.target.value)} placeholder="10" />
      </div>
      <div className="flex gap-2">
        <Button onClick={calculateHash}>Calcular</Button>
        <Button variant="outline" onClick={handleReset} disabled={!key && !partSize && !tableSize}>
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
            <h3 className="font-medium mb-2">Pasos:</h3>
            <div className="space-y-1 text-sm">
              {steps.map((step, index) => (
                <p key={index} className="whitespace-pre-wrap">
                  {step}
                </p>
              ))}
            </div>
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
        title="Método Hash por Plegamiento"
        description="El método hash por plegamiento divide la clave en partes de igual tamaño y las suma para calcular la posición en la tabla hash."
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

