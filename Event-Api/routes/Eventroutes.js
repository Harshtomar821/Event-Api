import express from "express"
  
import {createEvent, getEvent, registerEvent, cancelRegistration,
  listUpcomingEvents, eventStats} from "../controllers/eventcontroller"
import validateInput from "../middlewares/validInput";
const router = express()

router.post('/', validateInput(['title','event_at','location','capacity']), createEvent);

router.get('/:id', getEvent);
router.post('/:id/register', validateInput(['userId']), registerEvent);
router.delete('/:id/register', validateInput(['userId']), cancelRegistration);
router.get('/upcoming/list', listUpcomingEvents);
router.get('/:id/stats', eventStats);

export default router
