interface PathData {
    path: string;
    points: [number, number, number][];
}

interface Waypoint {
    id: string;
    position: [number, number, number];
    connections: string[];
}

interface NavMeshData {
    vertices: [number, number, number][];
    indices: number[];
}

const pathData: PathData[] = [
    {
        path: "MainRoute",
        points: [
            [0, 0, 0],
            [75, 0, 0],
            [75, 0, -20],
            [75, 0, -135],
            [75, 0, -140],
            [-80, 0, -140],
            [-80,0,-5],
            [-75,0,0],
            [0,0,0]
        ],
    },
    {
        path: "Shortcut",
        points: [
            [70,0,-340],
            [70,0,140],
            [78,0,140],
            [78,0,-340],
            [70,0,-340]
        ],
    },
    {
        path: "Loop",
        points: [
            [0,0,-140],
            [-75,0,-140],
            [-75,0,-226],
            [-40,0,-226],
            [-5,0,-240],
            [40,0,-258],
            [80,0,-259],
            [192,0,-259],
            [192,0,-228],
            [191.5,0,-220],
            [184,0,-213],
            [180,0,-213],
            [172,0,-213],
            [166,0,-210],
            [163,0,-204],
            [162,0,-200],
            [162,0,-140],
            [0,0,-140],
        ],
    }
];

const navMeshData: NavMeshData = {
    vertices: [
        [-200, 0, -400], [200, 0, -400], [200, 0, 200], [-200, 0, 200],
        [-60, 0, -60], [60, 0, -60], [60, 0, 60], [-60, 0, 60],
    ],
    indices: [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
    ]
};

export { pathData, navMeshData };
export default pathData;