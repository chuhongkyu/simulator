import MapBuildings from "./MapBuildings";

const Map = () => {
    return (
        <group>
            {/* {Object.keys(mapData).map((key) => (
                <GroundArea key={key} position={mapData[key].position} size={mapData[key].size} />
            ))} */}
            <MapBuildings />
        </group>
    );
};

export default Map;