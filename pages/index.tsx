import { DateTime } from 'luxon'
import Head from 'next/head'
import Link from 'next/link'

export default function RescueTime() {
  let currentWeek = DateTime.local().weekNumber
  const weeks = []
  do {
    weeks.push(currentWeek)
  } while (currentWeek--)
  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <main>
        Bella zì
        <ul>
          {weeks.map(weekNumber => (
            <li><Link href={`/week/2019/${weekNumber}`}><a>Week #{weekNumber}</a></Link></li>
          ))}
        </ul>
      </main>
    </>
  )
}