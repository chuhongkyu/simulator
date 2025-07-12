import * as THREE from 'three';
import { useMemo } from 'react';

interface BuildingObjectProps {
  geometry: {
    type: string;
    coordinates: any;
  };
  height: number;
  origin: [number, number];
  color?: string;
}

const BuildingObject = ({ 
    geometry, 
    height, 
    origin, 
    color="#FAF5EB" 
}: BuildingObjectProps) => {
    const latLonToXY = (lng: number, lat: number, origin: [number, number]) => {
        const R = 6371000; // Earth radius in meters
        const dX = (lng - origin[0]) * (Math.PI / 180) * R * Math.cos((lat + origin[1]) / 2 * (Math.PI / 180));
        const dZ = (lat - origin[1]) * (Math.PI / 180) * R;
        return [dX, -dZ]; // z축 반전
    };
  
  
    const shapeGeometry = useMemo(() => {
        let shape = new THREE.Shape();
        // Point 타입 처리
        if (geometry.type === 'Point') {
            const [lng, lat] = geometry.coordinates;
            const [x, z] = latLonToXY(lng, lat, origin);
            
            // Point를 작은 정사각형으로 표현
            const size = 5; // 미터 단위

            shape.moveTo(x - size/2, z - size/2);
            shape.lineTo(x + size/2, z - size/2);
            shape.lineTo(x + size/2, z + size/2);
            shape.lineTo(x - size/2, z + size/2);
            shape.lineTo(x - size/2, z - size/2);

            const extrudeSettings = {
                depth: 0.05,
                bevelEnabled: false
            };

            return new THREE.ExtrudeGeometry(shape, extrudeSettings);
        }

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
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

export default BuildingObject;
