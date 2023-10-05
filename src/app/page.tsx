import { returnPageTitle } from "@/utils/general"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: returnPageTitle('Acasa')
}

export default function Home() {
  return (
    <div className='flex flex-col gap-3 items-center justify-center w-full'>
      <h2 className='text-black font-medium text-xl'>
        Welcome to Edu-FitCare+
      </h2>
    </div>
  )
}
