import { storageService } from './storageService';

export const requestService = {
  createRequest(payload) {
    return storageService.saveRequest(payload);
  },
  getAllRequests() {
    return storageService.getAllRequests();
  },
  getRequestById(id) {
    return storageService.getRequestById(id);
  },
  updateRequest(id, updates) {
    return storageService.updateRequest(id, updates);
  },
  deleteRequest(id) {
    return storageService.deleteRequest(id);
  },
  saveResponse(payload) {
    return storageService.saveResponse(payload);
  },
  getResponsesByRequestId(requestId) {
    return storageService.getResponsesByRequestId(requestId);
  },
  getUniqueCategories() {
    return storageService.getUniqueCategories();
  },
};
