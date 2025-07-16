import { Html } from "@react-three/drei"

const Badge = ({name}:{name:string}) => {
    return(
        <Html position={[0,2,0]} center className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset whitespace-nowrap">
            <p>{name}</p>
        </Html>
    )
}

export default Badge;