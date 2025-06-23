import { useState } from 'react';
import { useAuth } from './useAuth';
import { useRequests } from './useRequests';
import { aiService } from '../services/aiService';

interface GenerateContentParams {
  prompt: string;
  engine: string;
  outputType: 'text' | 'image' | 'audio';
  settings?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  };
}

export function useAI() {
  const { user } = useAuth();
  const { createRequest, updateRequestStatus, createResult } = useRequests();
  const [loading, setLoading] = useState(false);

  const generateContent = async (params: GenerateContentParams) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);

    try {
      // Create request in database
      const request = await createRequest(params.prompt, params.engine);
      
      // Call AI service
      const result = await aiService.generateContent({
        ...params,
        requestId: request.id,
      });

      // Update request status
      await updateRequestStatus(request.id, 'completed');

      // Create result record
      await createResult(
        request.id,
        params.outputType,
        result.imageUrl || result.audioUrl,
        {
          ...params.settings,
          engine: params.engine,
          processingTime: result.processingTime,
        }
      );

      return result;
    } catch (error) {
      console.error('AI generation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateContent,
    loading,
  };
}