interface MapData {
    [key: string]: {
        position: [number, number, number];
        size: [number, number];
    };
}

const mapData: MapData = {
    "1-1": {
        "position": [10, 0, 0],
        "size": [10, 10],
    },
    "1-2": {
        "position": [-10, 0, 0],
        "size": [10, 10],
    },
    "2-1": {
        "position": [10, 0, -20],
        "size": [10, 10],
    },
    "2-2": {
        "position": [10, 0, -20],
        "size": [10, 10],
    },
}

export default mapData;