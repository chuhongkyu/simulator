import { useEffect, useState } from 'react';

interface GeoFeature {
  type: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any;
  };
  id: string;
}

export const useBuildingFeatures = (json: any) => {
  const [features, setFeatures] = useState<GeoFeature[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      const data = json;
      if (data.features && Array.isArray(data.features)) {
        setFeatures(data.features);
      } else {
        throw new Error('features 배열이 없습니다.');
      }
      setLoading(false);
    };

    fetchGeoJSON();
  }, [json]);

  return { features, loading, error };
};
