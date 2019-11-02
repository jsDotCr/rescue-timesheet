import fetch from 'isomorphic-unfetch'
import { DateTime } from 'luxon'
import Head from 'next/head'
import { NextPage } from 'next'

interface Activity {
  start: string
  end: string
  timeSpent: number
}
interface Props {
  activities: Array<{ date: string, intervals: Activity[] }>
}

export const RescueTimeWeek: NextPage<Props> = ({ activities }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      </Head>
      <main>
        {activities.map(activitiesPerDay => (
          <section className="ui raised very padded container segment">
            <h1 className="ui header">{activitiesPerDay.date}</h1>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Start</th>
                  <th>End</th>
                  <th>Time spent</th>
                </tr>
              </thead>
              <tbody>
                {activitiesPerDay.intervals.map(interval => (
                  <tr>
                    <td>{DateTime.fromISO(interval.start).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                    <td>{DateTime.fromISO(interval.end).toLocaleString(DateTime.TIME_SIMPLE)}</td>
                    <td>{interval.timeSpent}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3}><strong>{activitiesPerDay.intervals.reduce((acc, { timeSpent }) => acc + timeSpent, 0)} minutes</strong></td>
                </tr>
              </tbody>
            </table>
          </section>
        ))}
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
  const activities = await Promise.all(Array
    .from(new Array(5), (_, index) => week.plus({ days: index + 1 }).toISODate())
    .map(async date => {
      const intervals: Activity[] = await (await fetch(`${process.env.API || 'http://localhost:3000'}/api?date=${date}`))
        .json()
      return {
        date,
        intervals
      }
    }))
  return {
    activities
  }
}

export default RescueTimeWeek
