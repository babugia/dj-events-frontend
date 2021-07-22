const { events } = require('./data.json');

export default function handler(req, res) {
  const evt = events.filter((ev) => ev.slug === req.query.slug);

  const { method } = req;
  if (method === 'GET') {
    res.status(200).json(evt);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${method} is not allowed.` });
  }
}
