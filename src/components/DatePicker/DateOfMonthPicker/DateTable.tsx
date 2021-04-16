import c from 'classnames'
import dayjs from 'dayjs'
import { range } from 'lodash'
import { useCallback } from 'react'
import { useMemo } from 'react'

import styles from './DateTable.module.scss'

export type DateTableProps = {
  date: dayjs.Dayjs
  temporaryDate: dayjs.Dayjs
  onDateChange: (date: dayjs.Dayjs) => void
}

const week = range(1, 8).map((num) =>
  new Intl.NumberFormat('zh-Hans-CN-u-nu-hanidec').format(num),
)

export const DateTable: React.FC<DateTableProps> = ({
  date: prevDate,
  temporaryDate,
  onDateChange,
}) => {
  const thisMonth = useMemo(() => temporaryDate, [temporaryDate])
  const lastMonth = useMemo(() => thisMonth.subtract(1, 'month'), [thisMonth])
  const nextMonth = useMemo(() => thisMonth.add(1, 'month'), [thisMonth])

  const dayOfWeek = thisMonth.startOf('month').day()

  const endDateOfThisMonth = thisMonth.endOf('month').date()
  const endDateOfLastMonth = lastMonth.endOf('month').date()

  const nDaysLastMonthDisplayed = (dayOfWeek || 7) - 1
  const nDaysNextMonthDisplayed =
    42 - (nDaysLastMonthDisplayed + endDateOfThisMonth)

  const dates = useMemo(
    () => [
      /** datesLastMonth */
      ...range(
        endDateOfLastMonth - nDaysLastMonthDisplayed + 1,
        endDateOfLastMonth + 1,
      ).map((n) => lastMonth.date(n)),
      /** datesThisMonth */
      ...range(1, endDateOfThisMonth + 1).map((n) => thisMonth.date(n)),
      /** datesNextMonth */
      ...range(1, nDaysNextMonthDisplayed + 1).map((n) => nextMonth.date(n)),
    ],
    [
      endDateOfLastMonth,
      endDateOfThisMonth,
      lastMonth,
      nDaysLastMonthDisplayed,
      nDaysNextMonthDisplayed,
      nextMonth,
      thisMonth,
    ],
  )

  const checkIsActive = useCallback(
    (date: dayjs.Dayjs) => prevDate.isSame(date, 'date'),
    [prevDate],
  )
  const checkIsThisMonth = useCallback(
    (date: dayjs.Dayjs) => thisMonth.isSame(date, 'month'),
    [thisMonth],
  )
  const handleDateClick = useCallback(
    (date: dayjs.Dayjs) => () => {
      onDateChange(date)
    },
    [onDateChange],
  )

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {week.map((n) => (
          <div key={n} className={styles.th}>
            {n}
          </div>
        ))}

        {dates.map((date) => (
          <div
            key={date.toISOString()}
            className={c(styles.td, {
              [styles.out_of_range]: !checkIsThisMonth(date),
              [styles.active]: checkIsActive(date),
            })}
            onClick={handleDateClick(date)}
          >
            {date.date()}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DateTable
