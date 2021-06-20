import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useUserAccount, LoginSchema, login } from '@/data'

import styles from './LoginForm.module.scss'

const schema = yup.object().shape({
  phone: yup.string().required(),
  password: yup.string().required(),
})

export const LoginForm: React.VFC = () => {
  const { mutate } = useUserAccount()
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
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input name="phone" placeholder="手机号" ref={register} />
        {errors.phone && <p>请填写手机号</p>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="密码"
          ref={register}
        />
        {errors.password && <p>请填写密码</p>}
      </div>
      <input type="submit" value="登录" />
    </form>
  )
}

export default LoginForm
