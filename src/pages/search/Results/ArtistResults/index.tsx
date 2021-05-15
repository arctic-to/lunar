import { CloudSearchResponse } from '@/data'

export type ArtistResultsProps = { data: CloudSearchResponse }
export const ArtistResults: React.FC<ArtistResultsProps> = ({ data }) => {
  if (!('artists' in data.result)) return null
  return <div></div>
}

export default ArtistResults
