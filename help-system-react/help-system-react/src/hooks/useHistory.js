import { useMemo } from 'react';
import { historyService } from '../services/historyService';

export function useHistory(user) {
  const activities = useMemo(() => historyService.getActivitiesForUser(user), [user]);
  return { activities };
}
