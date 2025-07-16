"use client"

import { PathType } from "@/store/useAIPathSystem"
import PathColorItem from "./view/PathColorItem"

const Panel = () => {
  const paths: PathType[] = ["Main", "Sub-1", "Sub-2"]

  return (
    <>
      <h2 className="text-l font-semibold text-gray-900 my-2">Path Colors</h2>
      <ul className="flex flex-col gap-3">
        {paths.map((path) => (
          <li key={path}>
            <PathColorItem path={path} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Panel
