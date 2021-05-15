import { CloudSearchResponse } from '@/data'

export type PlaylistResultsProps = { data: CloudSearchResponse }
export const PlaylistResults: React.FC<PlaylistResultsProps> = ({ data }) => {
  if (!('playlists' in data.result)) return null
  return <div></div>
}

export default PlaylistResults
