'use client'
import { Button } from '@/components/ui/button'
import { logOut } from '@/app/(logged-out)/login/email-form/actions'

function LogoutButton() {
  return (
    <Button
      size={'sm'}
      className={'cursor-pointer p-5 hover:bg-gray-300 hover:text-gray-800'}
      onClick={async () => {
        await logOut()
      }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
