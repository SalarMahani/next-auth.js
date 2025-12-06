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
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginUser } from '@/app/(logged-out)/login/actions'

function Page() {
  const router = useRouter()
  const form = useForm<existedUserSchemaType>({
    resolver: zodResolver(existedUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  // dont panic we use this state for hidden/show input password.
  const [password, setPassword] = useState(false)

  const { errors } = form.formState
  const handleSubmit = async (data: existedUserSchemaType): Promise<void> => {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    })
    if (response?.error) {
      form.setError('root', {
        message: response?.message,
      })
      console.log('🔥')
    } else {
      console.log('this is my data:', data, response)
      router.push('/dashboard')
    }
  }

  return (
    <main
      className={`flex min-h-screen items-center justify-center bg-gray-900 text-6xl`}
    >
      <Card className={'w-96 bg-transparent text-gray-300'}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset disabled={form.formState.isSubmitting}>
            <CardHeader>
              <CardTitle className={'mb-3'}>Login</CardTitle>
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
              <Field orientation="horizontal" className={'flex-col'}>
                {!!form.formState.errors.root?.message && (
                  <FieldError className={'mt-4 mb-0 h-0 w-full p-0'}>
                    {form.formState.errors.root.message}
                  </FieldError>
                )}
                <Button
                  className={
                    'mt-6 w-full cursor-pointer bg-gray-800 p-5 hover:bg-gray-300' +
                    ' hover:text-gray-900'
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
        <CardFooter className={'flex-col gap-2'}>
          <div className={'text-muted-foreground text-sm'}>
            Don&#39;t have an account?{'  '}
            <Link className={'underline'} href={'/register'}>
              Register
            </Link>
          </div>
          <div className={'text-muted-foreground text-sm'}>
            Forgot password?{'  '}
            <Link className={'underline'} href={'/password-reset'}>
              Reset my password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Page
