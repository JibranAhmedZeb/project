import { useState, useEffect } from 'react';
import { supabase, Request, Result } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const createRequest = async (inputText: string, engine: string) => {
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('requests')
      .insert({
        user_id: user.id,
        input_text: inputText,
        engine: engine,
        status: 'pending',
      })
      .select()
      .single();

    if (!error && data) {
      setRequests(prev => [data, ...prev]);
      return data;
    }
    
    throw error;
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    const { error } = await supabase
      .from('requests')
      .update({ status })
      .eq('id', requestId);

    if (!error) {
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status } : req
        )
      );
    }
  };

  const createResult = async (requestId: string, outputType: string, outputUrl?: string, metadata?: any) => {
    const { data, error } = await supabase
      .from('results')
      .insert({
        request_id: requestId,
        output_type: outputType,
        output_url: outputUrl,
        metadata: metadata,
      })
      .select()
      .single();

    return { data, error };
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  return {
    requests,
    loading,
    createRequest,
    updateRequestStatus,
    createResult,
    refetch: fetchRequests,
  };
}