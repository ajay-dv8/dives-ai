import Image from 'next/image'

export const PortalBanner = () => {
  return (
    <div className='w-full flex justify-center py-5 bg-muted'>
      <Image
        src="/images/logo.svg"
        alt="LOGO"
        sizes="100vw"
        style={{
          width: '100px',
          height: 'auto',
        }}
        width={0}
        height={0}
      />
    </div>
  )
}
