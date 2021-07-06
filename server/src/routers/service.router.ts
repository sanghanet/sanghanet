import { list } from '../controllers/service.controller';

import { Router } from 'express';
const router = Router();

router.get('/', list);

export default router;
