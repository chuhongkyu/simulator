import mapData from "@/utils/mapData";
import GroundArea from "./object/GroundArea";

const Map = () => {
    return (
        <group>
            {Object.keys(mapData).map((key) => (
                <GroundArea key={key} position={mapData[key].position} size={mapData[key].size} />
            ))}
        </group>
    );
};

export default Map;