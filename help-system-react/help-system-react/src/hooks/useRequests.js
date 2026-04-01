import { useCallback, useEffect, useState } from 'react';
import { requestService } from '../services/requestService';

export function useRequests() {
  const [requests, setRequests] = useState([]);

  const refreshRequests = useCallback(() => {
    setRequests(requestService.getAllRequests());
  }, []);

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  return { requests, refreshRequests };
}
