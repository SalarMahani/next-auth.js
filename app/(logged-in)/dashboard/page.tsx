import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { auth } from '@/auth'

async function dashboard() {
  const session = await auth()
  console.log('session', session)
  return (
    <Card className={'w-fit border-0 bg-gray-800 text-gray-300'}>
      <CardHeader>
        <CardTitle className={'text-3xl'}>My Account</CardTitle>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <div className={'flex'}>
          <Label className={'mr-4'}>Email address:</Label>
          <div className={'text-gray-400'}>{session?.user?.email}</div>
        </div>
        <div className={'flex'}>
          <Label className={'mr-4'}>Login with:</Label>
          {session?.user?.image ? (
            <div className={'text-gray-400'}>Google account</div>
          ) : (
            <div className={'text-gray-400'}>email address</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default dashboard
