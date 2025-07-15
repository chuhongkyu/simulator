interface BuildingObjectProps {
  geometry: any
  color?: string;
}

const BuildingObject = ({geometry, color}:BuildingObjectProps) => {
    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial flatShading color={color}/>
        </mesh>
    );
};

export default BuildingObject;
