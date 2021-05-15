import { CloudSearchResponse } from '@/data'

export type UserResultsProps = { data: CloudSearchResponse }
export const UserResults: React.FC<UserResultsProps> = ({ data }) => {
  if (!('userprofiles' in data.result)) return null
  return <div></div>
}

export default UserResults
