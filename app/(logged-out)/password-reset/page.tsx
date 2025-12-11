'use client'
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
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  passwordResetSchema,
  passwordResetSchemaType,
} from '@/app/validation/passwordResetSchema'
import { Controller, useForm } from 'react-hook-form'
import { passwordReset } from '@/app/(logged-out)/password-reset/action'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { ChevronLeftIcon } from 'lucide-react'

function PasswordReset() {
  const searchParams = useSearchParams()
  const searchInput = searchParams.get('email')
  const passwordResetForm = useForm<passwordResetSchemaType>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: searchInput ? decodeURIComponent(searchInput) : '',
    },
  })
  const { reset } = passwordResetForm
  const { errors } = passwordResetForm.formState

  const handleSubmit = async (data: passwordResetSchemaType): Promise<void> => {
    const response = await passwordReset({
      email: data.email,
    })
    if (response?.error) {
      passwordResetForm.setError('root', {
        message: response.message,
      })
    }
    console.log('response', response)
  }
  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-gray-900 text-6xl`}
    >
      {passwordResetForm.formState.isSubmitSuccessful ? (
        <Card className={'w-140 gap-3 bg-transparent text-xl text-gray-300'}>
          <CardHeader>
            <CardTitle className={'text-2xl'}>Email Sent!</CardTitle>
          </CardHeader>
          <CardContent className={''}>
            Check you inbox, if you have an account with us you will receive a
            password reset email at {passwordResetForm.getValues('email')}.
          </CardContent>
          <CardFooter className={'relative'}>
            <div
              className={
                'absolute right-6 bottom-0 flex cursor-pointer items-center justify-center' +
                ' rounded-sm' +
                ' p-1 pr-2 pl-6' +
                ' bg-gray-300 text-center text-sm text-gray-900 transition-all' +
                ' hover:bg-gray-900' +
                ' w-fit hover:font-extrabold hover:text-gray-300'
              }
            >
              <ChevronLeftIcon className={'absolute -left-0'} />
              <button
                className={'cursor-pointer'}
                onClick={() => {
                  reset(undefined, { keepValues: true })
                }}
              >
                go back
              </button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className={'w-96 bg-transparent text-gray-300'}>
          <form onSubmit={passwordResetForm.handleSubmit(handleSubmit)}>
            <fieldset disabled={passwordResetForm.formState.isSubmitting}>
              <CardHeader>
                <CardTitle className={'mb-1 text-4xl'}>
                  Password Reset
                </CardTitle>
                <CardDescription className={'mb-5'}>
                  Enter your email address to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Controller
                    name="email"
                    control={passwordResetForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="type your email address"
                          autoComplete="off"
                          className={'text-gray-300'}
                        />
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
                  {!!passwordResetForm.formState.errors.root?.message && (
                    <FieldError className={'mt-4 mb-0 h-0 w-full p-0'}>
                      {passwordResetForm.formState.errors.root.message}
                    </FieldError>
                  )}
                  <Button
                    className={
                      'mt-6 w-full cursor-pointer bg-gray-800 p-5 hover:bg-gray-300' +
                      ' hover:text-gray-900'
                    }
                    type="submit"
                    disabled={!!errors?.email}
                  >
                    Submit
                  </Button>
                </Field>
              </CardFooter>
            </fieldset>
          </form>
          <CardFooter className={'flex-col gap-2'}>
            <div className={'text-muted-foreground text-sm'}>
              Remember your password?{'  '}
              <Link className={'underline'} href={'/login'}>
                Login
              </Link>
            </div>
            <div className={'text-muted-foreground text-sm'}>
              Don&#39;t have an account?{'  '}
              <Link className={'underline'} href={'/register'}>
                Register
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  )
}

export default PasswordReset
