import { DateTime } from 'luxon'

import { Row } from '../../types/RescueTime'

export function calculateIntervals(rows: Row[]) {
  const intervals: Array<{ start: DateTime, end?: DateTime, timeSpent?: number }> = []

  rows.forEach((item, idx) => {
    const prevTime = idx > 0 ? DateTime.fromISO(rows[idx - 1][0]) : null
    const time = DateTime.fromISO(item[0])
    const nextTime = rows[idx + 1] ? DateTime.fromISO(rows[idx + 1][0]) : null
    const diffFromLast = prevTime
      ? time.diff(prevTime, 'minutes').toObject()
      : null
    const diffFromNext = nextTime
      ? nextTime.diff(time, 'minutes').toObject()
      : null
    if (!diffFromLast || (diffFromLast.minutes && diffFromLast.minutes > 15)) {
      // first one
      // new interval
      intervals.push({
        start: time,
        end: undefined,
        timeSpent: undefined
      })
    }
    if (!diffFromNext || (diffFromNext.minutes && diffFromNext.minutes > 15)) {
      // last one
      // next useful time is > 15 minutes away
      intervals[intervals.length - 1].timeSpent = time
        .diff(intervals[intervals.length - 1].start, 'minutes')
        .toObject().minutes
      intervals[intervals.length - 1].end = time
      intervals[intervals.length - 1].start = intervals[
        intervals.length - 1
      ].start
    }
  })
  return intervals
}
