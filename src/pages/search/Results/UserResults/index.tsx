import React from 'react'

import { CloudSearchResponse } from '@/data'

import User from './User'

export type UserResultsProps = { data: CloudSearchResponse }
export const UserResults: React.FC<UserResultsProps> = ({ data }) => {
  if (!('userprofiles' in data.result)) return null

  return (
    <>
      {data.result.userprofiles?.map((userprofile, index) => (
        <User key={index} userprofile={userprofile} />
      ))}
    </>
  )
}

export default UserResults
