import Path from "./Path";
import { Car } from "./Car";

const MainCar = () => {
  return (
    <group>
      <Car renderOrder={4}/>
      <Path points={[[0, 0, 5], [0, 0, 0]]} renderOrder={3}/>
    </group>
  );
};

export default MainCar;