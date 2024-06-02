import { Router } from 'express'
import prisma from '../config/database'

const router = Router()

router.get('/', async (req,res)=> {
    const data = await prisma.feedback.findMany()
    res.status(200).json(data)
})
router.post('/', async (req, res) => {
    const { comments } = req.body;
  
    try {
      const feedback = await prisma.feedback.create({
        data: { comments }
      });
      res.status(201).json({ message: 'Feedback received', feedback });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ error: 'Error saving feedback' });
    }
  });

export default router
