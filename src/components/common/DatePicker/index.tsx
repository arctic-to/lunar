import c from 'classnames'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

import DateOfMonthPicker from './DateOfMonthPicker'
import styles from './DatePicker.module.scss'
import MonthPicker from './MonthPicker'
import { DatePickerStatus } from './enum'

export type DatePickerProps = {
  className?: string
  date: dayjs.Dayjs
  onChange: (date: dayjs.Dayjs) => void
}

const pickerMap = {
  [DatePickerStatus.Date]: DateOfMonthPicker,
  [DatePickerStatus.Month]: MonthPicker,
  [DatePickerStatus.Year]: null,
  [DatePickerStatus.Decade]: null,
}

export const DatePicker: React.VFC<DatePickerProps> = ({
  className,
  date,
  onChange,
}) => {
  const [status, setStatus] = useState(DatePickerStatus.Date)
  const [temporaryDate, setTemporaryDate] = useState(date)
  const Picker = useMemo(() => pickerMap[status], [status])

  if (!Picker) return null

  return (
    <div className={c(styles.container, className)}>
      <Picker
        date={date}
        temporaryDate={temporaryDate}
        onStatusChange={setStatus}
        onTemporaryDateChange={setTemporaryDate}
        onDateChange={onChange}
      />
    </div>
  )
}

export default DatePicker
