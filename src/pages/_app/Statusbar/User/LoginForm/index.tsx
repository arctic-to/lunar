import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { LoginSchema, login } from '@/data'
import { usePlatform } from '@/models'

import styles from './LoginForm.module.scss'

const schema = yup.object().shape({
  phone: yup.string().required(),
  password: yup.string().required(),
})

interface LoginFormProps {
  onSuccess(): void
}

export const LoginForm: React.VFC<LoginFormProps> = ({ onSuccess }) => {
  const { netease } = usePlatform()
  const [loading, setLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(
    (data: LoginSchema) => {
      setLoading(true)
      login(data)
        .then(({ account, profile }) => {
          netease.setAccount(account)
          netease.setProfile(profile)
          onSuccess()
        })
        .catch(() => {
          setIsFailed(true)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [netease, onSuccess],
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
      {isFailed && <p>登录失败</p>}
      <input type="submit" value={loading ? '...' : '登录'} />
    </form>
  )
}

export default LoginForm
