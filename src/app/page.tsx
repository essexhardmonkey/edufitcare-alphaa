import { returnPageTitle } from "@/utils/general"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: returnPageTitle('Acasa')
}

export default function Home() {
  return (
    <center>
    <div className='flex flex-col gap-3 items-center justify-center w-full'>
      <h2 className='text-black font-medium text-xl'>
        Vrei sa incepi o schimbare dar nu stii de unde sa incepi? Aplicatia noastra te ajuta sa iti imbunatatesti stilul de viata printr-un mod productiv de a te antrena si a oferi corpului o alimentatie optima pentru atingerea obiectivelor personale! Conteaza pe noi!
      </h2>
    </div>

    </center>



  )
}
