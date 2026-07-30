import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  createEmergencyRequest,
  getAllEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyRequestStatus,
  deleteEmergencyRequest,
} from '../controllers/emergencyController.js';

const router = Router();

router.post('/', authMiddleware, createEmergencyRequest);
router.get('/', getAllEmergencyRequests);
router.get('/:id', getEmergencyRequestById);
router.patch('/:id/status', authMiddleware, updateEmergencyRequestStatus);
router.delete('/:id', authMiddleware, deleteEmergencyRequest);

export default router;
