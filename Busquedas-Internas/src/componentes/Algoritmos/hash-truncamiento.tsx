"use client"

import { useState } from "react"
import { AlgorithmLayout } from "@/componentes/ui/layout-algoritmo"
import { ErrorModal } from "@/componentes/ui/error-modal";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export function HashTruncation() {
  const [key, setKey] = useState("")
  const [tableSize, setTableSize] = useState("")
  const [selectedPositions, setSelectedPositions] = useState<number[]>([])
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

    if (selectedPositions.length === 0) {
      setError({
        show: true,
        title: "Error de validación",
        message: "Por favor seleccione al menos una posición de dígito.",
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

    // Extract selected digits
    const newSteps = [`1. Extraer los dígitos seleccionados de la clave ${key}:`]
    const extractedDigits: string[] = []

    selectedPositions
      .sort((a, b) => a - b)
      .forEach((pos) => {
        if (pos < key.length) {
          extractedDigits.push(key[pos])
          newSteps.push(`   Posición ${pos}: ${key[pos]}`)
        }
      })

    if (extractedDigits.length === 0) {
      setError({
        show: true,
        title: "Error de validación",
        message: "Las posiciones seleccionadas están fuera del rango de la clave.",
      })
      return
    }

    // Combine extracted digits
    const combinedValue = Number.parseInt(extractedDigits.join(""))
    newSteps.push(`2. Combinar los dígitos extraídos: ${extractedDigits.join("")} = ${combinedValue}`)

    // Apply modulo
    const hashValue = combinedValue % parsedTableSize
    newSteps.push(`3. Aplicar módulo: ${combinedValue} mod ${parsedTableSize} = ${hashValue}`)

    // Adjust to base 1 position
    const hashPosition = hashValue + 1
    newSteps.push(`4. Ajustar a posición base 1: ${hashValue} + 1 = ${hashPosition}`)

    setSteps(newSteps)
    setResult(hashPosition)
  }

  const handlePositionChange = (position: number) => {
    setSelectedPositions((prev) => (prev.includes(position) ? prev.filter((p) => p !== position) : [...prev, position]))
  }

  const handleReset = () => {
    setKey("")
    setTableSize("")
    setSelectedPositions([])
    setResult(null)
    setSteps([])
  }

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="key">Clave (número entero)</Label>
        <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="123456789" />
      </div>

      {key && (
        <div className="space-y-2">
          <Label>Seleccionar posiciones de dígitos (0-indexado)</Label>
          <div className="flex flex-wrap gap-3 mt-1">
            {Array.from({ length: key.length }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`pos-${index}`}
                  checked={selectedPositions.includes(index)}
                  onCheckedChange={() => handlePositionChange(index)}
                />
                <Label htmlFor={`pos-${index}`} className="text-sm">
                  {index}: {key[index]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="tableSize">Tamaño de la tabla</Label>
        <Input id="tableSize" value={tableSize} onChange={(e) => setTableSize(e.target.value)} placeholder="10" />
      </div>

      <div className="flex gap-2">
        <Button onClick={calculateHash}>Calcular</Button>
        <Button variant="outline" onClick={handleReset} disabled={!key && !tableSize && selectedPositions.length === 0}>
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
        title="Método Hash por Truncamiento"
        description="El método hash por truncamiento selecciona y utiliza solo ciertos dígitos de la clave para calcular la posición en la tabla hash."
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

