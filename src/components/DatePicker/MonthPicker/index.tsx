import dayjs from 'dayjs'
import { useCallback } from 'react'

import Header from '../Header'
import { DatePickerStatus } from '../enum'

import MonthTable from './MonthTable'

export type MonthPickerProps = {
  date: dayjs.Dayjs
  temporaryDate: dayjs.Dayjs
  onStatusChange: (status: DatePickerStatus) => void
  onTemporaryDateChange: (temporaryDate: dayjs.Dayjs) => void
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  date,
  temporaryDate,
  onStatusChange,
  onTemporaryDateChange,
}) => {
  const toPrevYear = useCallback(() => {
    onTemporaryDateChange(temporaryDate.subtract(1, 'year'))
  }, [temporaryDate, onTemporaryDateChange])

  const toNextYear = useCallback(() => {
    onTemporaryDateChange(temporaryDate.add(1, 'year'))
  }, [temporaryDate, onTemporaryDateChange])

  return (
    <>
      <Header
        onChevronsLeftClick={toPrevYear}
        onChevronsRightClick={toNextYear}
      >
        <span>{temporaryDate.year()}</span>
      </Header>

      <MonthTable
        date={date}
        temporaryDate={temporaryDate}
        onStatusChange={onStatusChange}
        onTemporaryDateChange={onTemporaryDateChange}
      />
    </>
  )
}

export default MonthPicker
