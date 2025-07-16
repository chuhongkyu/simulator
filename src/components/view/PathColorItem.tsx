"use client"

import React from "react"
import { PathType, useAIPathSystem } from "@/store/useAIPathSystem"

interface PathColorItemProps {
  path: PathType
}

const PathColorItem: React.FC<PathColorItemProps> = ({ path }) => {
  const color = useAIPathSystem((state) => state.pathColors[path])
  const setPathColor = useAIPathSystem((state) => state.setPathColor)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPathColor(path, e.target.value)
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <span
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-gray-800">{path}</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={handleChange}
          className="w-12 h-6 border-none cursor-pointer bg-transparent"
        />
        <span className="text-xs text-gray-500 font-mono">{color}</span>
      </div>
    </div>
  )
}

export default PathColorItem
