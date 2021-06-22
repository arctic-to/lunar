import dayjs from 'dayjs'
import { useCallback } from 'react'

import Header from '../Header'
import { DatePickerStatus } from '../enum'

import DateTable from './DateTable'

export type DateOfMonthPickerProps = {
  date: dayjs.Dayjs
  temporaryDate: dayjs.Dayjs
  onStatusChange: (status: DatePickerStatus) => void
  onTemporaryDateChange: (temporaryDate: dayjs.Dayjs) => void
  onDateChange: (temporaryDate: dayjs.Dayjs) => void
}

export const DateOfMonthPicker: React.FC<DateOfMonthPickerProps> = ({
  date,
  temporaryDate,
  onStatusChange,
  onTemporaryDateChange,
  onDateChange,
}) => {
  const handleMonthClick = useCallback(() => {
    onStatusChange(DatePickerStatus.Month)
  }, [onStatusChange])

  const toPrevYear = useCallback(() => {
    onTemporaryDateChange(temporaryDate.subtract(1, 'year'))
  }, [temporaryDate, onTemporaryDateChange])

  const toNextYear = useCallback(() => {
    onTemporaryDateChange(temporaryDate.add(1, 'year'))
  }, [temporaryDate, onTemporaryDateChange])

  const toPrevMonth = useCallback(() => {
    onTemporaryDateChange(temporaryDate.subtract(1, 'month'))
  }, [temporaryDate, onTemporaryDateChange])

  const toNextMonth = useCallback(() => {
    onTemporaryDateChange(temporaryDate.add(1, 'month'))
  }, [temporaryDate, onTemporaryDateChange])

  return (
    <>
      <Header
        onChevronsLeftClick={toPrevYear}
        onChevronsRightClick={toNextYear}
        onChevronLeftClick={toPrevMonth}
        onChevronRightClick={toNextMonth}
      >
        <span>{temporaryDate.year()}</span>
        <span> / </span>
        <span onClick={handleMonthClick}>
          {(temporaryDate.month() + 1).toString().padStart(2, '0')}
        </span>
      </Header>

      <DateTable
        date={date}
        temporaryDate={temporaryDate}
        onDateChange={onDateChange}
      />
    </>
  )
}

export default DateOfMonthPicker
