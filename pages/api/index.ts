import { NowRequest, NowResponse } from '@now/node'

import { fetchActivities } from './_fetch'
import { filterActivities } from './_filter'
import { calculateIntervals } from './_intervals'

async function get(req: NowRequest, res: NowResponse) {
  if (!req.query.date) {
    return res.status(400).json({ error: 'Date not specified' })
  }
  const rows = await fetchActivities(req.query.date.toString())
  if (!rows || rows.length === 0) {
    return res.status(200).json({ warning: 'No activity found' })
  }
  const data = calculateIntervals(filterActivities(rows))
  return res.status(200).json(data)
}

export default async function RescueTimeAPI(req: NowRequest, res: NowResponse) {
  if (req.method === 'GET') {
    return get(req, res)
  }
  res.status(405)
}
