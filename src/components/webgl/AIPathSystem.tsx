import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { 
    NavMesh, 
    Vehicle,
    FollowPathBehavior,
    Path,
    Vector3 as YukaVector3,
    Polygon
} from 'yuka';
import { navMeshData, pathData, waypoints } from '@/utils/data';
import { Car } from './Car';
import { Html, Line } from '@react-three/drei';
import FollowCamera from './common/FollowCamera';
import useCameraControllerStore from '@/store/useCameraController';
import { useAIPathSystem } from '@/store/useAIPathSystem';
import CustomPath from './object/path/CustomPath';
import { IPath } from './object/path/PathTypes';

interface AIPathSystemProps {
    debug?: boolean;
}

const AIPathSystem = ({ debug = false }: AIPathSystemProps) => {
    const navMeshRef = useRef<NavMesh>(null);
    const vehiclesRef = useRef<Vehicle[]>([]);
    const pathRef = useRef<Path>(null);
    const debugMeshRef = useRef<THREE.Mesh>(null);
    const vehicleMeshesRef = useRef<THREE.Group[]>([]);
    const cameraNumber = useCameraControllerStore(state => state.cameraNumber)
    const pathColors = useAIPathSystem(state => state.pathColors);
    
    const navMesh = useMemo(() => {
        const mesh = new NavMesh();
        
        const vertices = navMeshData.vertices.map(vertex => 
            new YukaVector3(vertex[0], vertex[1], vertex[2])
        );
        

        const polygons: Polygon[] = [];
        
        for (let i = 0; i < navMeshData.indices.length; i += 3) {
            const v1 = vertices[navMeshData.indices[i]];
            const v2 = vertices[navMeshData.indices[i + 1]];
            const v3 = vertices[navMeshData.indices[i + 2]];
            
            if (v1 && v2 && v3) {
                // Polygon.fromContour을 사용해서 폴리곤 생성
                const polygon = new Polygon().fromContour([v1, v2, v3]);
                polygons.push(polygon);
            }
        }
        
        return mesh.fromPolygons(polygons);
    }, []);

    // 경로 생성 - 각 차량마다 다른 경로 사용
    const paths = useMemo(() => {
        const paths: Path[] = [];
        
        // 3개의 경로 생성 (MainRoute, Shortcut, Loop)
        pathData.forEach((routeData, index) => {
            const path = new Path();
            
            routeData.points.forEach(point => {
                path.add(new YukaVector3(point[0], point[1], point[2]));
            });
            
            path.loop = true;
            paths.push(path);
        });
        
        return paths;
    }, []);

    // AI 차량들 생성 - 각 차량이 다른 경로 사용
    const vehicles = useMemo(() => {
        const vehicles: Vehicle[] = [];
        
        for (let i = 0; i < 3; i++) {
            const vehicle = new Vehicle();
            // 초기 위치 설정 - 각 경로의 시작점
            const routeData = pathData[i];
            const startPoint = routeData.points[0];
            
            vehicle.position.set(startPoint[0], startPoint[1], startPoint[2]);
            
            // 속도 설정
            vehicle.maxSpeed = 5;
            vehicle.maxForce = 5;
            
            const followPathBehavior = new FollowPathBehavior(paths[i], 1.2);
            
            vehicle.steering.add(followPathBehavior);
            
            vehicles.push(vehicle);
        }
        
        return vehicles;
    }, [paths]);

    // 디버그 메시 생성 - navMeshData 사용
    // const debugMesh = useMemo(() => {
    //     if (!debug) return null;
        
    //     const geometry = new THREE.BufferGeometry();
    //     const positions: number[] = [];
        
    //     navMeshData.vertices.forEach(vertex => {
    //         positions.push(vertex[0], vertex[1], vertex[2]);
    //     });
        
    //     geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    //     geometry.computeBoundingSphere();
        
    //     return geometry;
    // }, [debug]);

    // NavMesh 폴리곤 시각화
    const navMeshPolygons = useMemo(() => {
        if (!debug) return null;
        
        const geometry = new THREE.BufferGeometry();
        const positions: number[] = [];
        
        // indices를 사용해서 삼각형 생성 (순차적 렌더링)
        for (let i = 0; i < navMeshData.indices.length; i += 3) {
            const v1 = navMeshData.vertices[navMeshData.indices[i]];
            const v2 = navMeshData.vertices[navMeshData.indices[i + 1]];
            const v3 = navMeshData.vertices[navMeshData.indices[i + 2]];
            
            if (v1 && v2 && v3) {
                positions.push(v1[0], v1[1], v1[2]);
                positions.push(v2[0], v2[1], v2[2]);
                positions.push(v3[0], v3[1], v3[2]);
            }
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        // 인덱스 없이 순차적 렌더링 사용
        geometry.computeBoundingSphere();
        
        return geometry;
    }, [debug]);

    const pathLines = useMemo(() => {
        const lines: IPath[] = [];
        
        const colors = [pathColors.Main, pathColors['Sub-1'], pathColors['Sub-2']];
        
        pathData.forEach((routeData, routeIndex) => {
            const points = routeData.points.map(point => 
                new THREE.Vector3(point[0], point[1], point[2])
            );
            
            lines.push({
                points,
                color: colors[routeIndex % colors.length]
            });
        });
        
        return lines;
    }, [pathColors]);

    
    useFrame((state, delta) => {
        // 각 차량 업데이트
        vehicles.forEach((vehicle, index) => {
            vehicle.update(delta);
            
            if (vehicleMeshesRef.current[index]) {
                const group = vehicleMeshesRef.current[index];
                group.name = String(index) + "_Car"
                group.position.set(vehicle.position.x, vehicle.position.y, vehicle.position.z);

                if (vehicle.velocity.length() > 0.1) {
                    const direction = vehicle.velocity.clone().normalize();
                    const angle = Math.atan2(direction.x, direction.z);
                    group.rotation.y = angle;
                }
            }
        });
    });

    useEffect(() => {
        navMeshRef.current = navMesh;
        vehiclesRef.current = vehicles;
        pathRef.current = paths[0];
    }, [navMesh, vehicles, paths]);

    return (
        <>
        <group>
            {/* 경로 시각화 */}
            {pathLines.map((line, index) => (
                <CustomPath
                    key={index + "_PATH"} 
                    line={line} 
                    position={[0, 0.05 + (index * 0.04),0]}
                />
            ))}
            
            {/* AI 차량들 */}
            {vehicles.map((vehicle, index) => (
                <group
                    key={index + "AI-Car"}
                    ref={(el) => {
                        if (el) vehicleMeshesRef.current[index] = el;
                    }}
                    position={[vehicle.position.x, vehicle.position.y, vehicle.position.z]}
                >
                    <Car key={"Car-" + (index + 1)} name={"Car-" + (index + 1)}/>
                </group>
            ))}
            
            {/* 웨이포인트 시각화 - 동그란 점으로 */}
            {debug && waypoints.map((waypoint, index) => (
                <mesh 
                    key={index} 
                    rotation={[-Math.PI/2,0,0]} 
                    position={[waypoint.position[0],waypoint.position[1] + 0.1,waypoint.position[2]]}
                >
                    <circleGeometry args={[0.3, 16]} />
                    <meshBasicMaterial color="#16625b"/>
                </mesh>
            ))}
            
            {/* NavMesh 정점 디버그 시각화 - Points로 변경 */}
            {/* {debug && debugMesh && (
                <points geometry={debugMesh}>
                    <pointsMaterial color="#0000ff" size={0.5} />
                </points>
            )} */}
            
            {/* NavMesh 폴리곤 디버그 시각화 */}
            {debug && navMeshPolygons && (
                <mesh geometry={navMeshPolygons}>
                    <meshBasicMaterial color="#ff00ff" wireframe opacity={0.5} transparent />
                </mesh>
            )}
        </group>
        {vehicles[cameraNumber] &&
            <FollowCamera
                debug={true}
                targetRef={vehicles[cameraNumber]} 
                cameraZoom={1} 
                cameraPosition={[0, 10, 10]}
            />
        }
        </>
    );
};

export default AIPathSystem; 