"use client"

import { useState } from "react"
import { AlgorithmLayout } from "@/componentes/ui/layout-algoritmo"
import { ErrorModal } from "@/componentes/ui/error-modal";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function HashSquare() {
  const [key, setKey] = useState("")
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
    const square = parsedKey * parsedKey
    const squareStr = square.toString()

    const newSteps = [`1. Elevar la clave al cuadrado: ${parsedKey}² = ${square}`]

    // Extract middle digits based on table size
    let middleDigits: string
    const sizeLength = parsedSize.toString().length

    if (squareStr.length <= sizeLength) {
      middleDigits = squareStr
      newSteps.push(`2. El cuadrado tiene menos dígitos que el tamaño de la tabla, se usa completo: ${middleDigits}`)
    } else {
      const startPos = Math.floor((squareStr.length - sizeLength) / 2)
      middleDigits = squareStr.substring(startPos, startPos + sizeLength)
      newSteps.push(
        `2. Extraer ${sizeLength} dígitos del centro: ${middleDigits} (posiciones ${startPos} a ${startPos + sizeLength - 1})`,
      )
    }

    const hashValue = Number.parseInt(middleDigits) % parsedSize
    newSteps.push(`3. Aplicar módulo: ${middleDigits} mod ${parsedSize} = ${hashValue}`)

    const hashPosition = hashValue + 1 // Position starts at 1
    newSteps.push(`4. Ajustar a posición base 1: ${hashValue} + 1 = ${hashPosition}`)

    setSteps(newSteps)
    setResult(hashPosition)
  }

  const handleReset = () => {
    setKey("")
    setTableSize("")
    setResult(null)
    setSteps([])
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
            <h3 className="font-medium mb-2">Pasos:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
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
        title="Método Hash Cuadrado"
        description="El método hash cuadrado eleva la clave al cuadrado y extrae los dígitos centrales para calcular la posición en la tabla hash."
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

