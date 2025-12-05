'use client'
import { Button } from '@/components/ui/button'
import { logOut } from '@/app/login/actions'

function LogoutButton() {
  return (
    <Button
      size={'sm'}
      onClick={async () => {
        await logOut()
      }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
