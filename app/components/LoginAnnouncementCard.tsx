import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function LoginAnnouncementCard() {
  return (
    <Card className={'w-190 bg-transparent text-gray-300'}>
      <CardHeader>
        <CardTitle className={'m-2 text-3xl'}>
          Your account has been created{' '}
          <span className={'text-green-500'}> successfully</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className={
            'mt-6 w-full cursor-pointer bg-gray-800 p-7 text-xl hover:bg-gray-300 hover:text-gray-900'
          }
          asChild
        >
          <Link href="/login">Login to your account</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginAnnouncementCard
