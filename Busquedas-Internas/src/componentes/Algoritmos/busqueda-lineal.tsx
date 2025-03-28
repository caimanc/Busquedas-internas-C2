"use client"

import { useState } from "react"
import { AlgorithmLayout } from "@/componentes/ui/layout-algoritmo"
import { ErrorModal } from "@/componentes/ui/error-modal";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function LinearSearch() {
  const [array, setArray] = useState<number[]>([])
  const [arrayInput, setArrayInput] = useState("")
  const [target, setTarget] = useState<number | null>(null)
  const [targetInput, setTargetInput] = useState("")
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState({ show: false, title: "", message: "" })

  const validateAndParseArray = (input: string): number[] | null => {
    if (!input.trim()) {
      setError({
        show: true,
        title: "Error de validación",
        message: "Por favor ingrese un arreglo de números.",
      })
      return null
    }

    const values = input.split(",").map((item) => item.trim())
    const numbers: number[] = []
    const seen = new Set()

    for (const value of values) {
      if (!/^-?\d+(\.\d+)?$/.test(value)) {
        setError({
          show: true,
          title: "Error de formato",
          message: "El arreglo debe contener solo números, separados por comas.",
        })
        return null
      }

      const num = Number.parseFloat(value)
      if (seen.has(num)) {
        setError({
          show: true,
          title: "Error de duplicados",
          message: "El arreglo no debe contener números duplicados.",
        })
        return null
      }

      seen.add(num)
      numbers.push(num)
    }

    return numbers
  }

  const handleStartSearch = () => {
    const parsedArray = validateAndParseArray(arrayInput)
    if (!parsedArray) return

    const parsedTarget = Number.parseFloat(targetInput)
    if (isNaN(parsedTarget)) {
      setError({
        show: true,
        title: "Error de validación",
        message: "Por favor ingrese un número válido para buscar.",
      })
      return
    }

    parsedArray.sort((a, b) => a - b) // Ordenar el arreglo de menor a mayor

    setArray(parsedArray)
    setTarget(parsedTarget)
    setCurrentIndex(0)
    setResult(null)
    setIsSearching(true)
    setIsComplete(false)
  }

  const handleNextStep = () => {
    if (currentIndex === null || !isSearching) return

    if (currentIndex < array.length) {
      if (array[currentIndex] === target) {
        setResult(currentIndex)
        setIsSearching(false)
        setIsComplete(true)
        return
      }

      setCurrentIndex(currentIndex + 1)
    }

    if (currentIndex === array.length - 1) {
      setResult(-1)
      setIsSearching(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    setArrayInput("")
    setTargetInput("")
    setArray([])
    setTarget(null)
    setCurrentIndex(null)
    setResult(null)
    setIsSearching(false)
    setIsComplete(false)
  }

  const inputSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="array">Arreglo (números separados por comas)</Label>
        <Input
          id="array"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="1, 3, 5, 7, 9"
          disabled={isSearching}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="target">Número a buscar</Label>
        <Input
          id="target"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          placeholder="5"
          disabled={isSearching}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleStartSearch} disabled={isSearching}>
          Iniciar búsqueda
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={!arrayInput && !targetInput}>
          Reiniciar
        </Button>
      </div>
    </div>
  )

  const resultSection = (
    <div className="space-y-4">
      {(isSearching || isComplete) && (
        <>
          <div className="text-sm">
            <p>
              Buscando <strong>{target}</strong> en el arreglo:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {array.map((num, index) => (
                <div
                  key={index}
                  className={`
                    w-10 h-10 flex items-center justify-center border rounded
                    ${index === currentIndex && isSearching ? "bg-yellow-200 border-yellow-500" : ""}
                    ${result === index ? "bg-green-200 border-green-500" : ""}
                  `}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {isSearching && (
            <div>
              {currentIndex !== null && (
                <p className="mb-2">
                  Comparando el elemento en la posición {currentIndex + 1}: {array[currentIndex]} con {target}
                </p>
              )}
              <Button onClick={handleNextStep}>Siguiente paso</Button>
            </div>
          )}

          {isComplete && (
            <div>
              {result !== -1 ? (
                <p className="text-green-600 font-medium">¡Elemento encontrado en la posición {result + 1}!</p>
              ) : (
                <p className="text-red-600 font-medium">Elemento no encontrado en el arreglo.</p>
              )}
            </div>
          )}
        </>
      )}

      {!isSearching && !isComplete && (
        <div className="text-center text-muted-foreground">
          Ingrese los datos y presione "Iniciar búsqueda" para comenzar.
        </div>
      )}
    </div>
  )

  return (
    <>
      <AlgorithmLayout
        title="Búsqueda Lineal"
        description="La búsqueda lineal recorre secuencialmente cada elemento del arreglo hasta encontrar el valor buscado o llegar al final."
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