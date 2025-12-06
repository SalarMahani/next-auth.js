import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { auth } from '@/auth'

async function Page() {
  const session = await auth()
  return (
    <Card className={'w-70 border-0 bg-gray-800 text-gray-300'}>
      <CardHeader className={''}>
        <CardTitle className={''}>My Account</CardTitle>
      </CardHeader>
      <CardContent className={'flex gap-4'}>
        <Label>Email address:</Label>
        <div className={'text-gray-400'}>{session?.user?.email}</div>
      </CardContent>
    </Card>
  )
}

export default Page
