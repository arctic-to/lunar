import c from 'classnames'
import dayjs from 'dayjs'
import { range } from 'lodash'
import { useCallback } from 'react'
import { useMemo } from 'react'

import { DatePickerStatus } from '../enum'

import styles from './MonthTable.module.scss'

export type MonthTableProps = {
  date: dayjs.Dayjs
  temporaryDate: dayjs.Dayjs
  onStatusChange: (status: DatePickerStatus) => void
  onTemporaryDateChange: (date: dayjs.Dayjs) => void
}

export const MonthTable: React.FC<MonthTableProps> = ({
  date: prevMonth,
  temporaryDate,
  onStatusChange,
  onTemporaryDateChange,
}) => {
  const thisYear = useMemo(() => temporaryDate, [temporaryDate])

  const months = useMemo(() => range(12).map((n) => thisYear.month(n)), [
    thisYear,
  ])

  const checkIsActive = useCallback(
    (month: dayjs.Dayjs) => prevMonth.isSame(month, 'month'),
    [prevMonth],
  )

  const handleMonthClick = useCallback(
    (month: dayjs.Dayjs) => () => {
      onTemporaryDateChange(month)
      onStatusChange(DatePickerStatus.Date)
    },
    [onStatusChange, onTemporaryDateChange],
  )

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {months.map((month) => (
          <div
            className={c(styles.td, {
              [styles.active]: checkIsActive(month),
            })}
            onClick={handleMonthClick(month)}
          >
            {(month.month() + 1).toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthTable
