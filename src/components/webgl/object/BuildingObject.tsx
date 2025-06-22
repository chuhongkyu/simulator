import * as THREE from 'three';
import { useMemo } from 'react';

interface BuildingObjectProps {
  geometry: {
    type: string;
    coordinates: any;
  };
  height: number;
  origin: [number, number];
}

const BuildingObject = ({ geometry, height, origin }: BuildingObjectProps) => {
    const latLonToXY = (lng: number, lat: number, origin: [number, number]) => {
        const R = 6371000; // Earth radius in meters
        const dX = (lng - origin[0]) * (Math.PI / 180) * R * Math.cos((lat + origin[1]) / 2 * (Math.PI / 180));
        const dZ = (lat - origin[1]) * (Math.PI / 180) * R;
        return [dX, -dZ]; // z축 반전
    };
  
  
    const shapeGeometry = useMemo(() => {
        const shape = new THREE.Shape();

        // MultiPolygon 또는 Polygon 처리
        const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];

        // 단일 폴리곤만 처리 (다중은 필요 시 향후 확장)
        const coords = polygons[0][0];

        coords.forEach((coord: [number, number], index: number) => {
        const [x, z] = latLonToXY(coord[0], coord[1], origin);
        if (index === 0) {
            shape.moveTo(x, z);
        } else {
            shape.lineTo(x, z);
        }
        });

        const extrudeSettings = {
            depth: height,
            bevelEnabled: false
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, [geometry, height, origin]);

    return (
        <mesh geometry={shapeGeometry}>
            <meshStandardMaterial color="#18304A" />
        </mesh>
    );
};

export default BuildingObject;
