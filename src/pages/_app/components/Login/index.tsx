import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useUser, LoginSchema, login } from '@/models'

const schema = yup.object().shape({
  phone: yup.string().required(),
  password: yup.string().required(),
})

export const Login: React.VFC = () => {
  const { mutate } = useUser()
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(
    (data: LoginSchema) => {
      mutate(login(data))
    },
    [mutate],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="phone" ref={register} />
      <p>{errors.phone?.message}</p>
      <input name="password" ref={register} />
      <p>{errors.password?.message}</p>
      <input type="submit" />
    </form>
  )
}

export default Login
