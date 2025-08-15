import { Router } from 'express';
import { authController } from '../controllers';

const router = Router();

const { signUp, signIn, updateTokens } = authController;

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/update-tokens/:token', updateTokens);

export default router;
