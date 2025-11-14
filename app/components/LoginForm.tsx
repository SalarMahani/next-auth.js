'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { Controller, useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { passwordSchema } from '@/app/validation/passwordSchema'
import { registerUser } from '@/app/register/actions'
// import { formSchema, formType } from '@/app/register/page'

export const formSchema = z

  .object({
    email: z.email(),
  })
  .and(passwordSchema)
export type formType = z.infer<typeof formSchema>

function LoginForm({ form }: { form: UseFormReturn<formType> }) {
  const [password, setPassword] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState(false)

  type formData = z.infer<typeof formSchema>

  const { errors } = form.formState
  const handleSubmit = async (data: formData): Promise<void> => {
    const response = await registerUser({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })

    if (response?.error) {
      form.setError('email', {
        message: response?.message,
      })
    }
    // console.log('this is my data:', data, response)
  }

  return (
    <Card className={'w-96 bg-transparent text-gray-300'}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <CardHeader>
            <CardTitle className={'mb-3'}>Register</CardTitle>
            <CardDescription className={'mb-5'}>
              Register for a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="type your email address baby"
                      autoComplete="off"
                      className={'text-gray-300'}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {/*  password*/}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className={'relative'}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel>password</FieldLabel>
                    <div className={'flex'}>
                      <Input
                        type={password ? 'text' : 'password'}
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="type your password baby"
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
              {/*  confirm password*/}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    className={'relative'}
                    data-invalid={fieldState.invalid}
                  >
                    <FieldLabel>confirm password</FieldLabel>
                    <div className={'flex'}>
                      <Input
                        type={passwordConfirm ? 'text' : 'password'}
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="type your confirm password baby"
                        autoComplete="off"
                        className={'text-gray-300'}
                      />
                      <Button
                        type={'button'}
                        onClick={() => setPasswordConfirm(!passwordConfirm)}
                        className="absolute top-0 right-0 h-fit -translate-x-1/5 translate-y-5/5 cursor-pointer hover:bg-transparent"
                      >
                        {!passwordConfirm ? (
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
            <Field orientation="horizontal">
              <Button
                className={
                  'mt-6 w-full cursor-pointer bg-gray-800 p-5 hover:bg-gray-300 hover:text-gray-900'
                }
                type="submit"
                disabled={
                  !!(
                    errors?.email ||
                    errors?.confirmPassword ||
                    errors?.password
                  )
                }
              >
                Submit
              </Button>
            </Field>
          </CardFooter>
        </fieldset>
      </form>
    </Card>
  )
}

export default LoginForm
