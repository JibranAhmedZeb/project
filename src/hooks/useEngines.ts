import { useState, useEffect } from 'react';
import { supabase, Engine } from '../lib/supabase';

export function useEngines() {
  const [engines, setEngines] = useState<Engine[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEngines = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('engines')
      .select('*')
      .order('name');

    if (!error && data) {
      setEngines(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEngines();
  }, []);

  return {
    engines,
    loading,
    refetch: fetchEngines,
  };
}