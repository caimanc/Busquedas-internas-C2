"use client"

import { useState } from "react"
import { AlgorithmLayout } from "@/componentes/ui/layout-algoritmo"
import { ErrorModal } from "@/componentes/ui/error-modal";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function BinarySearch() {
  const [array, setArray] = useState<number[]>([])
  const [arrayInput, setArrayInput] = useState("")
  const [target, setTarget] = useState<number | null>(null)
  const [targetInput, setTargetInput] = useState("")
  const [left, setLeft] = useState<number | null>(null)
  const [right, setRight] = useState<number | null>(null)
  const [mid, setMid] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState({ show: false, title: "", message: "" })
  const [step, setStep] = useState<string>("")

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


    return numbers.sort((a, b) => a - b)
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

    setArray(parsedArray)
    setTarget(parsedTarget)
    setLeft(0)
    setRight(parsedArray.length - 1)
    const initialMid = Math.floor((0 + parsedArray.length - 1) / 2)
    setMid(initialMid)
    setResult(null)
    setIsSearching(true)
    setIsComplete(false)
  }

  const handleNextStep = () => {
    if (left === null || right === null || mid === null || target === null || !isSearching) return

    if (left <= right) {
      if (array[mid] === target) {
        setResult(mid)
        setStep(`Elemento encontrado: ${array[mid]}`)
        setIsSearching(false)
        setIsComplete(true)
        return
      }

      if (array[mid] < target) {
        const newLeft = mid + 1
        const newMid = Math.floor((newLeft + right) / 2)
        setLeft(newLeft)
        setMid(newMid)
        setStep(`Comparando el valor ${array[mid]} con ${target} (tomando elementos de la derecha)`)
      } else {
        const newRight = mid - 1
        const newMid = Math.floor((left + newRight) / 2)
        setRight(newRight)
        setMid(newMid)
        setStep(`Comparando el valor ${array[mid]} con ${target} (tomando elementos de la izquierda)`)
      }
    } else {
      setResult(-1)
      setStep("Elemento no encontrado en el arreglo")
      setIsSearching(false)
      setIsComplete(true)
    }
  }

  const handleReset = () => {
    setArrayInput("")
    setTargetInput("")
    setArray([])
    setTarget(null)
    setLeft(null)
    setRight(null)
    setMid(null)
    setResult(null)
    setStep("")
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
        {array.length > 0 && <p className="text-xs text-muted-foreground">Arreglo ordenado: {array.join(", ")}</p>}
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
                    ${index === mid && isSearching ? "bg-yellow-200 border-yellow-500" : ""}
                    ${left !== null && right !== null && index >= left && index <= right && isSearching ? "border-blue-300" : ""}
                    ${result === index ? "bg-green-200 border-green-500" : ""}
                  `}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm">{step}</p>
            {isSearching && <Button onClick={handleNextStep}>Siguiente paso</Button>}
          </div>

          {isComplete && (
            <div>
              {result !== -1 ? (
                <p className="text-green-600 font-medium">¡Elemento encontrado: {array[result!]}!</p>
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
        title="Búsqueda Binaria"
        description="La búsqueda binaria divide repetidamente a la mitad el espacio de búsqueda para encontrar un valor en un arreglo ordenado."
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

