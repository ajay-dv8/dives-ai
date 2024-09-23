import Image from 'next/image'

export const PortalBanner = () => {
  return (
    <div className='w-full px-10 flex items-center gap-x-4 py-2 bg-muted'>
      <Image
        src="/images/logo.svg"
        alt="LOGO"
        sizes="80vw"
        style={{
          width: '30px',
          height: 'auto',
        }}
        width={0}
        height={0}
      />

      <h2 className='text-xl'>Dives AI</h2>
    </div>
  )
}
