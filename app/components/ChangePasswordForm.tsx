'use client'

import { Controller, useForm } from 'react-hook-form'
import {
  changePasswordSchema,
  changePasswordSchemaType,
} from '@/app/validation/changePasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import { changePassword } from '@/app/(logged-in)/change-password/action'
import { toast } from 'sonner'

function ChangePasswordForm() {
  const changePasswordForm = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  })

  const [password, setPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState(false)

  const { errors } = changePasswordForm.formState
  const handleSubmit = async (
    data: changePasswordSchemaType,
  ): Promise<void> => {
    const response = await changePassword({
      currentPassword: data.currentPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
    if (response?.error) {
      changePasswordForm.setError('root', {
        message: response.message,
      })
    } else {
      changePasswordForm.reset()
      toast.success('Password changed successfully.', {
        style: {
          background: '#27ae60',
          border: 'none',
          color: '#eaecef',
        },
      })
      // console.log('this is the response', response)
    }
  }

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-gray-900`}
    >
      <Card className={'w-96 bg-transparent text-gray-300'}>
        <form onSubmit={changePasswordForm.handleSubmit(handleSubmit)}>
          <fieldset disabled={changePasswordForm.formState.isSubmitting}>
            <CardHeader>
              <CardTitle className={'mb-8 text-3xl'}>Change Password</CardTitle>
            </CardHeader>

            <CardContent>
              <FieldGroup>
                {/* current password*/}
                <Controller
                  name="currentPassword"
                  control={changePasswordForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className={'relative'}
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel>Current Password</FieldLabel>
                      <div className={'flex'}>
                        <Input
                          type={currentPassword ? 'text' : 'password'}
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="type your current password"
                          autoComplete="off"
                          className={'text-gray-300'}
                        />
                        <Button
                          type={'button'}
                          onClick={() => setCurrentPassword(!currentPassword)}
                          className="absolute top-0 right-0 h-fit -translate-x-1/5 translate-y-5/5 cursor-pointer hover:bg-transparent"
                        >
                          {!currentPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* new password*/}
                <Controller
                  name="password"
                  control={changePasswordForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className={'relative'}
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel>New Password</FieldLabel>
                      <div className={'flex'}>
                        <Input
                          type={password ? 'text' : 'password'}
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="type your new password"
                          autoComplete="off"
                          className={'text-gray-300'}
                        />
                        <Button
                          type={'button'}
                          onClick={() => setPassword(!password)}
                          className="absolute top-0 right-0 h-fit -translate-x-1/5 translate-y-5/5 cursor-pointer hover:bg-transparent"
                        >
                          {!password ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {/* confirm new password*/}
                <Controller
                  name="confirmPassword"
                  control={changePasswordForm.control}
                  render={({ field, fieldState }) => (
                    <Field
                      className={'relative'}
                      data-invalid={fieldState.invalid}
                    >
                      <FieldLabel>Confirm New Password</FieldLabel>
                      <div className={'flex'}>
                        <Input
                          type={confirmPassword ? 'text' : 'password'}
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="type the new password again"
                          autoComplete="off"
                          className={'text-gray-300'}
                        />
                        <Button
                          type={'button'}
                          onClick={() => setConfirmPassword(!confirmPassword)}
                          className="absolute top-0 right-0 h-fit -translate-x-1/5 translate-y-5/5 cursor-pointer hover:bg-transparent"
                        >
                          {!confirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal" className={'flex-col'}>
                {!!changePasswordForm.formState.errors.root?.message && (
                  <FieldError className={'mt-4 mb-3 h-0 w-full p-0'}>
                    {changePasswordForm.formState.errors.root.message}
                  </FieldError>
                )}
                <Button
                  className={
                    'mt-6 w-full cursor-pointer bg-gray-800 p-5 hover:bg-gray-300' +
                    ' hover:text-gray-900'
                  }
                  type="submit"
                  disabled={
                    !!(
                      errors?.password ||
                      errors?.currentPassword ||
                      errors?.confirmPassword
                    )
                  }
                >
                  Change Password
                </Button>
              </Field>
            </CardFooter>
          </fieldset>
        </form>
      </Card>
    </main>
  )
}

export default ChangePasswordForm
