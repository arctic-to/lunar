import { CloudSearchResponse } from '@/data'

export type LyricResultsProps = { data: CloudSearchResponse }
export const LyricResults: React.FC<LyricResultsProps> = ({ data }) => {
  if (!('songs' in data.result)) return null
  return <div></div>
}

export default LyricResults
