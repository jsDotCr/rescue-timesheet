import { DateTime } from 'luxon'

import { Row } from '../../types/RescueTime'

export function filterActivities(rows: Row[]) {
  return rows.filter(([date, _time, _ppl, activity, _category, productivity]: Row) => {
    // exclude unproductive stuff
    if (productivity < 1) {
      return false
    }

    // exclude mobile activities
    const lActivity = activity.toLowerCase()
    if (lActivity.startsWith('mobile') || lActivity.includes('android')) {
      return false
    }

    // exclude messaging apps
    if (
      lActivity.includes('telegram') ||
      lActivity.includes('signal private messenger') ||
      lActivity.includes('facebook messenger')
    ) {
      return false
    }

    // exclude false positives
    if (
      lActivity.includes('microsoft excel') ||
      lActivity.includes('blank web browser') ||
      lActivity.includes('mail.protonmail.com') ||
      lActivity.includes('windows explorer') ||
      lActivity.includes('applicationframehost')
    ) {
      return false
    }

    // exclude hours
    const parsedDate = DateTime.fromISO(date)
    if (parsedDate.hour < 6 || parsedDate.hour > 20) {
      return false
    }
    return true
  })
}
