'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as React from 'react'
import {
  existedUserSchema,
  existedUserSchemaType,
} from '@/app/validation/existedUserSchema'
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
import { useState } from 'react'
import { z } from 'zod'
import { loginUser } from '@/app/login/actions'

function Page() {
  const form = useForm<existedUserSchemaType>({
    resolver: zodResolver(existedUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [password, setPassword] = useState(false)

  type formData = z.infer<typeof existedUserSchema>
  const { errors } = form.formState

  const handleSubmit = async (data: formData): Promise<void> => {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    })
    // if (response?.error) {
    //
    // }
    if (response?.problem && response?.problem) {
      form.setError('password', {
        message: response?.message,
      })
    } else {
      form.setError('email', {
        message: response?.message,
      })
    }
    console.log('this is my data:', data, response)
  }

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-gray-900 text-6xl`}
    >
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
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal">
                <Button
                  className={
                    'mt-6 w-full cursor-pointer bg-gray-800 p-5 hover:bg-gray-300 hover:text-gray-900'
                  }
                  type="submit"
                  disabled={!!(errors?.email || errors?.password)}
                >
                  Submit
                </Button>
              </Field>
            </CardFooter>
          </fieldset>
        </form>
      </Card>
    </main>
  )
}

export default Page
