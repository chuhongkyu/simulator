import MapBuildings from "./MapBuildings";
import MapRoads from "./MapRoads";

const Map = () => {
    return (
        <group position={[0,0,0]}>
            <MapRoads/>
            <MapBuildings />
        </group>
    );
};

export default Map;