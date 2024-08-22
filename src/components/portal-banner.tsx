import Image from 'next/image'

export const PortalBanner = () => {
  return (
    <div className='w-full flex justify-center items-center gap-x-4 py-2 bg-muted'>
      <Image
        src="/images/logo.svg"
        alt="LOGO"
        sizes="100vw"
        style={{
          width: '50px',
          height: 'auto',
        }}
        width={0}
        height={0}
      />

      <h2 className='text-3xl '>Dives AI</h2>
    </div>
  )
}
