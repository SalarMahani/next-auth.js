'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import * as React from 'react'
import RegisterForm, {
  formSchema,
  formType,
} from '@/app/components/RegisterForm'
import LoginAnnouncementCard from '@/app/components/LoginAnnouncementCard'

function Page() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
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

export default Page
