import map from '@/utils/map.json';
import { useBuildingFeatures } from '@/hooks/useBuildingFeatures';
import BuildingObject from './object/BuildingObject';

const MapBuildings = () => {
  const { features, loading, error } = useBuildingFeatures(map);

  const ORIGIN: [number, number] = [127.111304, 37.393714];

  if (loading || error) return null;

  return (
    <group rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.5}>
      {features?.map((feature) => {
            const geometry = feature.geometry;
            const height = 10;
            return (
                <BuildingObject
                    key={feature.id}
                    geometry={geometry}
                    height={height}
                    origin={ORIGIN}
                />
            );
        })}
    </group>
  );
};

export default MapBuildings;
