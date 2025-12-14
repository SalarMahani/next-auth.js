'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import LoginAnnouncementCard from '@/app/components/LoginAnnouncementCard'
import {
  newUserSchema,
  newUserSchemaType,
} from '@/app/validation/newUserSchema'
import RegisterForm from '@/app/components/RegisterForm'

function Register() {
  const form = useForm<newUserSchemaType>({
    resolver: zodResolver(newUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-gray-900 text-6xl`}
    >
      {form.formState.isSubmitSuccessful ? (
        <LoginAnnouncementCard />
      ) : (
        <RegisterForm form={form} />
      )}
    </main>
  )
}

export default Register
