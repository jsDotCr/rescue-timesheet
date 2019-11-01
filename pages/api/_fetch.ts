import dotenv from 'dotenv'
import fetch from 'isomorphic-unfetch'
import { URL, URLSearchParams } from 'url'

import { Row } from '../../types/RescueTime'

dotenv.config()

export async function fetchActivities(date: string): Promise<Row[]> {
  const key = process.env.KEY
  if (!key) {
    throw new Error('KEY must be defined!')
  }
  const url = new URL('/anapi/data', 'https://www.rescuetime.com')
  url.search = new URLSearchParams({
    key,
    perspective: 'interval',
    restrict_kind: 'activity',
    interval: 'minute',
    restrict_begin: date,
    restrict_end: date,
    format: 'json'
  }).toString()
  const { rows } = await (await fetch(url.toString())).json()
  return rows
}
