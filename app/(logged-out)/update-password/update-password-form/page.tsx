'use client'
import {
  Card,
  CardContent,
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
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  passwordSchema,
  passwordSchemaType,
} from '@/app/validation/passwordSchema'
import { updatePasswordForm } from '@/app/(logged-out)/update-password/update-password-form/action'
import Link from 'next/link'

function UpdatePasswordForm({ token }: { token: string }) {
  const UpdatePasswordForm = useForm<passwordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const [password, setPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)

  const { errors } = UpdatePasswordForm.formState
  const handleSubmit = async (data: passwordSchemaType): Promise<void> => {
    const response = await updatePasswordForm({
      password: data.password,
      confirmPassword: data.confirmPassword,
      token,
    })
    if (response?.tokenIsExpired) {
      window.location.reload()
    }
    if (response?.error) {
      UpdatePasswordForm.setError('root', {
        message: response.message,
      })
    } else {
      UpdatePasswordForm.reset()
      toast.success('Password changed successfully.', {
        style: {
          background: '#27ae60',
          border: 'none',
          color: '#eaecef',
        },
      })
    }
  }

  return UpdatePasswordForm.formState.isSubmitSuccessful ? (
    <div className={'flex flex-col gap-3'}>
      Your Password has been updated!
      <br />
      <Link href="/login" className={'text-sm underline'}>
        Click here to login to your account
      </Link>
    </div>
  ) : (
    <form onSubmit={UpdatePasswordForm.handleSubmit(handleSubmit)}>
      <fieldset disabled={UpdatePasswordForm.formState.isSubmitting}>
        <CardContent>
          <FieldGroup>
            {/* new password*/}
            <Controller
              name="password"
              control={UpdatePasswordForm.control}
              render={({ field, fieldState }) => (
                <Field className={'relative'} data-invalid={fieldState.invalid}>
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
                      className="absolute top-0 right-0 h-0 -translate-x-1/5 translate-y-10 cursor-pointer hover:bg-transparent"
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
              control={UpdatePasswordForm.control}
              render={({ field, fieldState }) => (
                <Field className={'relative'} data-invalid={fieldState.invalid}>
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
            {!!UpdatePasswordForm.formState.errors.root?.message && (
              <FieldError className={'mt-4 mb-3 h-0 w-full p-0'}>
                {UpdatePasswordForm.formState.errors.root.message}
              </FieldError>
            )}
            <Button
              className={
                'mt-6 w-full cursor-pointer bg-gray-800 p-5 hover:bg-gray-300' +
                ' hover:text-gray-900'
              }
              type="submit"
              disabled={!!(errors?.password || errors?.confirmPassword)}
            >
              Update Password
            </Button>
          </Field>
        </CardFooter>
      </fieldset>
    </form>
  )
}

export default UpdatePasswordForm
