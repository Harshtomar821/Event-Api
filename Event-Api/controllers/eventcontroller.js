import Event from '../models/event';
import User from '../models/User';

export const createEvent = async (req, res) => {
  try {
    const { title, event_at, location, capacity } = req.body;

    if (capacity < 1 || capacity > 1000){
      return res.status(400).json({ message: 'Capacity must be between 1 and 1000' });
    }
    const event = new Event({ title, event_at, location, capacity });
    await event.save();
    res.status(201).json({ message: 'Event created', eventId: event._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('registrations', 'name email');

    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const event = await Event.findOne({
      _id: req.params.id,
      event_at: { $gt: new Date() },
      registrations: { $ne: userId }
    });

    if (!event) {
      const checkEvent = await Event.findById(req.params.id);
      if (!checkEvent) return res.status(404).json({ message: 'Event not found' });

      if (checkEvent.registrations.includes(userId)) {
        
        return res.status(400).json({ message: 'Already registered' });
    }


      if (checkEvent.registrations.length >= checkEvent.capacity) {


        return res.status(400).json({ message: 'Event is full' });
    
    }



      if (checkEvent.event_at <= new Date()) {
        
        return res.status(400).json({ message: 'Cannot register for past event' });}


      return res.status(400).json({ message: 'Registration failed' });
    }

    event.registrations.push(userId);
    
    await event.save();


    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    const index = event.registrations.indexOf(userId);
    if (index === -1) return res.status(400).json({ message: 'User not registered' });

    event.registrations.splice(index, 1);
    await event.save();
    res.json({ message: 'Registration cancelled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ event_at: { $gt: new Date() } })
      .sort({ event_at: 1, location: 1 });
    res.json(events);
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const eventStats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const total = event.registrations.length;
    const remaining = event.capacity - total;
    const percentage = ((total / event.capacity) * 100).toFixed(2);

    res.json({ totalRegistrations: total, remainingCapacity:

         remaining, capacityUsedPercent: percentage });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
