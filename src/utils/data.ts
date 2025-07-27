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
        path: "Main",
        points: [
            [0, 0, 0],
            [75, 0, 0],
            [75, 0, -20],
            [75, 0, -135],
            [75, 0, -140],
            [50, 0, -140],
            [25, 0, -140],
            [0, 0, -140],
            [-80, 0, -140],
            [-80, 0, -120],
            [-80,0,-5],
            [-75,0,0],
            [0,0,0]
        ],
    },
    {
        path: "Sub-1",
        points: [
            [70,0,-300],
            [70,0,140],
            [78,0,140],
            [78,0,-300],
            [70,0,-300]
        ],
    },
    {
        path: "Sub-2",
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

const waypoints: Waypoint[] = [
    // --- Main ---
    { id: "wp_0", position: [0, 0, 0], connections: ["wp_1"] },
    { id: "wp_1", position: [75, 0, 0], connections: ["wp_0", "wp_2"] },
    { id: "wp_2", position: [75, 0, -20], connections: ["wp_1", "wp_3"] },
    { id: "wp_3", position: [75, 0, -135], connections: ["wp_2", "wp_4"] },
    { id: "wp_4", position: [75, 0, -140], connections: ["wp_3", "wp_5"] },
    { id: "wp_5", position: [50, 0, -140], connections: ["wp_4", "wp_6"] },
    { id: "wp_6", position: [25, 0, -140], connections: ["wp_5", "wp_7"] },
    { id: "wp_7", position: [0, 0, -140], connections: ["wp_6", "wp_8"] },

    { id: "wp_8", position: [-80, 0, -140], connections: ["wp_7", "wp_9"] },
    { id: "wp_9", position: [-80, 0, -120], connections: ["wp_8", "wp_10"] },
    
    { id: "wp_10", position: [-80, 0, -5], connections: ["wp_9", "wp_11"] },
    { id: "wp_11", position: [-75, 0, 0], connections: ["wp_11", "wp_12"] },
    { id: "wp_12", position: [0, 0, 0], connections: ["wp_12"] },
  
    // --- Sub-1 ---
    { id: "wp_13", position: [70, 0, -300], connections: ["wp_14"] },
    { id: "wp_14", position: [70, 0, 140], connections: ["wp_13", "wp_15"] },
    { id: "wp_15", position: [78, 0, 140], connections: ["wp_14", "wp_16"] },
    { id: "wp_16", position: [78, 0, -300], connections: ["wp_15", "wp_17"] },
    { id: "wp_17", position: [70, 0, -300], connections: ["wp_16"] },

    // --- Sub-2 ---
    { id: "wp_18", position: [0, 0, -140], connections: ["wp_19"] },
    { id: "wp_19", position: [-75, 0, -140], connections: ["wp_18", "wp_20"] },
    { id: "wp_20", position: [-75, 0, -226], connections: ["wp_19", "wp_21"] },
    { id: "wp_21", position: [-40, 0, -226], connections: ["wp_20", "wp_22"] },
    { id: "wp_22", position: [-5, 0, -240], connections: ["wp_21", "wp_23"] },
    { id: "wp_23", position: [40, 0, -258], connections: ["wp_22", "wp_24"] },
    { id: "wp_24", position: [80, 0, -259], connections: ["wp_23", "wp_25"] },
    { id: "wp_25", position: [192, 0, -259], connections: ["wp_24", "wp_26"] },
    { id: "wp_26", position: [192, 0, -228], connections: ["wp_25", "wp_27"] },
    { id: "wp_27", position: [191.5, 0, -220], connections: ["wp_26", "wp_28"] },
    { id: "wp_28", position: [184, 0, -213], connections: ["wp_27", "wp_29"] },
    { id: "wp_29", position: [180, 0, -213], connections: ["wp_28", "wp_30"] },
    { id: "wp_30", position: [172, 0, -213], connections: ["wp_29", "wp_31"] },
    { id: "wp_31", position: [166, 0, -210], connections: ["wp_30", "wp_32"] },
    { id: "wp_32", position: [163, 0, -204], connections: ["wp_31", "wp_33"] },
    { id: "wp_33", position: [162, 0, -200], connections: ["wp_32", "wp_34"] },
    { id: "wp_34", position: [162, 0, -140], connections: ["wp_33", "wp_35"] },
    { id: "wp_35", position: [0, 0, -140], connections: ["wp_34"] },

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

export { pathData, waypoints, navMeshData };
export default pathData;