import { Router, Request, Response } from 'express';
import { createDeal, CreateDealPayload } from '../services/bitrix24';

export const dealsRouter = Router();

interface CreateDealBody {
  title?: string;
  goal?: string;
  city?: string;
}

dealsRouter.post('/', async (req: Request<{}, {}, CreateDealBody>, res: Response) => {
  const { title, goal, city } = req.body;

  // Validate required fields
  const errors: string[] = [];
  if (!title?.trim()) errors.push('title is required');
  if (!goal?.trim()) errors.push('goal is required');
  if (!city?.trim()) errors.push('city is required');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const payload: CreateDealPayload = {
    title: title!.trim(),
    goal: goal!.trim(),
    city: city!.trim(),
  };

  try {
    const dealId = await createDeal(payload);
    return res.status(201).json({
      success: true,
      dealId,
      message: `Сделка #${dealId} успешно создана в Bitrix24`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Deal creation error]', message);
    return res.status(500).json({ success: false, error: message });
  }
});
