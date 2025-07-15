import map from '@/utils/map.json';
import { useMapFeatures } from '@/hooks/useMapFeatures';
import * as THREE from 'three';
import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import BuildingObject from './BuildingObject';

const ORIGIN: [number, number] = [127.111304, 37.393714];

function latLonToXY(lng: number, lat: number, origin: [number, number]) {
  const R = 6371000;
  const dX = (lng - origin[0]) * (Math.PI / 180) * R * Math.cos((lat + origin[1]) / 2 * (Math.PI / 180));
  const dZ = (lat - origin[1]) * (Math.PI / 180) * R;
  return [dX, -dZ];
}

const MapBuildings = () => {
  const { features, loading, error } = useMapFeatures(map);

  if (loading || error) return null;

  return (
    <group position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.5, 0.5, -0.5]}>
      {features?.map((feature, idx) => {
        if (!feature.properties.building) return null;

        const name = feature.properties.name;
        let color = "#fff"
        const buildingName = feature.properties.building;

        switch (buildingName) {
          case "office":
            color = "#7d93fd"
            break;
          case "residential":
            color = "#ffe5d6"
            break;
          case "apartments":
            color = "#ffe5d6"
            break;
          default:
            color = "fff"
            break;
        }

        const geometry = feature.geometry;
        const height = 20;

        let shape = new THREE.Shape();
        const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];
        const coords = polygons[0][0];

        coords.forEach((coord: [number, number], index: number) => {
          const [x, z] = latLonToXY(coord[0], coord[1], ORIGIN);
          if (index === 0) shape.moveTo(x, z);
          else shape.lineTo(x, z);
        });

        const extrudeSettings = { depth: height, bevelEnabled: false };
        const extrudeGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        const [centerX, centerZ] = latLonToXY(coords[0][0], coords[0][1], ORIGIN);

        return (
          <group key={idx}>
            <BuildingObject 
              geometry={extrudeGeometry} 
              color={color}
            />
            {/* <group rotateX={Math.PI/2}>
              {name && (
                <Html position={[centerX, centerZ, 5]} center>
                  <div className="whitespace-nowrap bg-white pt-1 px-2 rounded-lg">
                    {name}
                  </div>
                </Html>
              )}
            </group> */}
          </group>
        );
      })}
    </group>
  );
};

export default MapBuildings;
