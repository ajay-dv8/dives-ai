import Image from 'next/image' 
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solid leading-[154.5%] max-md:flex-wrap max-md:px-5 backdrop-blur-sm bg-white/30 ">
      <div className="flex gap-1.5 gap-x-4 items-center justify-center self-stretch my-auto text-xl tracking-tighter text-neutral-700">
        <Image
          src="/images/logo.svg"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '20%',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        <p className="">Dives AI</p>
      </div>
      
      <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li>Home</li>
        <li>Pricing</li>
        <li>News Room</li>
        <li>Features</li>
        <li>Contact us</li>
      </ul>

      {/* settings route is from dashboard */}
      {/* TODO: Ajay directory system fro dashboard rout if possible */}
      <Link
        href="/settings"
        className="bg-green font-normal px-2 py-1 rounded text-white hover:bg-green hover:opacity-80"
      >
        Try for Free
      </Link>
    </div>
  )
}

