import { Navbar } from "@/components/navbar"; 
import { PricingCard } from "@/components/pricing-cards";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="sticky top-0">
        <Navbar />
      </div>

      <section className="">
        <div className="flex via items-center justify-center flex-col gap-4 mt-18">
          <span className="text-green mt-10 text-sm bg-green/20 px-3 py-1 rounded-full text-center">
            An ai-powered business rep
          </span>

          <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
            <h1 className="text-7xl text-green">Dives AI</h1>

            <p className="text-center max-w-[500px] mb-8 text-muted-foreground text-gray-600">
              Your AI powered sales assistant! Embed Dives AI into any website
              with just a snippet of code!
            </p>

            <Button className="bg-green hover:bg-green/80 font-bold text-white px-4 mb-4">
              Start For Free
            </Button>

            {/* <Image
              src="/images/iphonecorinna.png"
              width={400}
              height={100}
              alt="lpimg"
              className="max-w-lg object-contain"
            />  */}
          </div> 
        </div>
      </section>

      <section className="flex justify-center items-center flex-col gap-4 mt-28">
        
        <h2 className="text-4xl text-center"> Choose whats right for your business</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-lg">
          We have a straight forward pricing plans tailored to meet your needs. You can get started for free If {" you're"} not ready to commit.
        </p>

        <PricingCard />
      </section>

      {/* Feature blog post component here */}
      <div className="h-64 w-full flex justify-center items-center">
        {/* Feature blog post cards here */}  
        <p className='text-7xl text-green'>
          Featured Blog Posts
        </p>

      </div>
    </main>
  );
}
