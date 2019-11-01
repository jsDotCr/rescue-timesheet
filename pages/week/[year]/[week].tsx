import { DateTime } from 'luxon'
import Head from 'next/head'
import { NextPage } from 'next'

interface Props {
  days: [string, string, string, string, string]
}

export const RescueTimeWeek: NextPage<Props> = ({ days }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <main>
        {days}
      </main>
    </>
  )
}

RescueTimeWeek.getInitialProps = async ctx => {
  const weekYear = Number(ctx.query.year)
  const weekNumber = Number(ctx.query.week)

  const week = DateTime.fromObject({
    weekNumber,
    weekYear
  })

  return {
    days: [
      week.plus({ days: 1 }).toISODate(),
      week.plus({ days: 2 }).toISODate(),
      week.plus({ days: 3 }).toISODate(),
      week.plus({ days: 4 }).toISODate(),
      week.plus({ days: 5 }).toISODate(),
    ]
  }
}

export default RescueTimeWeek
