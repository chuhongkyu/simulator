import { useMapFeatures } from '@/hooks/useMapFeatures';
import map from '@/utils/map.json';
import { Line } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const ORIGIN: [number, number] = [127.111304, 37.393714];

function latLonToXY(lng: number, lat: number, origin: [number, number]) {
  const R = 6371000;
  const dX = (lng - origin[0]) * (Math.PI / 180) * R * Math.cos((lat + origin[1]) / 2 * (Math.PI / 180));
  const dZ = (lat - origin[1]) * (Math.PI / 180) * R;
  return [dX, 0, dZ] as [number, number, number];
}

const MapRoads = () => {
  const { features, loading, error } = useMapFeatures(map);

  const roadMeshes = useMemo(() => {
    const meshes: React.ReactNode[] = [];

    features?.forEach((feature, i) => {
      if (feature.properties.highway) {
        const geometry = feature.geometry;

        if (geometry.type === 'LineString') {
          // coordinates: [lng, lat][]
          const points = (geometry.coordinates as number[][]).map(([lng, lat]) =>
            new THREE.Vector3(...latLonToXY(lng, lat, ORIGIN))
          );
          if (points.length > 1) {
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeometry = new THREE.TubeGeometry(curve, 64, 1, 8, false); // 1: 도로 반지름(폭)
            meshes.push(
              <mesh key={`line-${i}`} geometry={tubeGeometry}>
                <meshStandardMaterial color="#3c9df8" transparent opacity={0.2} />
              </mesh>
            );
          }
        } else if (geometry.type === 'Polygon') {

          const rings = geometry.coordinates as number[][][];
          if (rings.length > 0) {
            const shapePoints = rings[0].map(([lng, lat]) => {
              const [x, , z] = latLonToXY(lng, lat, ORIGIN);
              return new THREE.Vector2(x, z);
            });
            const shape = new THREE.Shape(shapePoints);
            // holes 처리 (있으면)
            for (let h = 1; h < rings.length; h++) {
              const holePoints = rings[h].map(([lng, lat]) => {
                const [x, , z] = latLonToXY(lng, lat, ORIGIN);
                return new THREE.Vector2(x, z);
              });
              shape.holes.push(new THREE.Path(holePoints));
            }
            const geometry = new THREE.ShapeGeometry(shape);
            meshes.push(
              <mesh key={`poly-${i}`} geometry={geometry} rotation={[-Math.PI/2,0,0]}>
                <meshStandardMaterial transparent opacity={0.4} color="#960000" side={THREE.DoubleSide} />
              </mesh>
            );
          }
        }
      }
    });

    return meshes;
  }, [features]);

  if (loading || error) return null;

  return (
    <group position={[0,0,0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, -0.5]}>
      {roadMeshes}
    </group>
  );
};

export default MapRoads;
