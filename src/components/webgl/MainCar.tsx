import Path from "./Path";
import { Car } from "./Car";

const MainCar = () => {
  return (
    <group>
      <Car renderOrder={4}/>
      <Path start={[0, 0, 5]} end={[0, 0, 0]} renderOrder={3}/>
    </group>
  );
};

export default MainCar;