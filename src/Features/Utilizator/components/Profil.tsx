import getProbleme from "../api/getProbleme";
import ProfileInfo from "./ProfileInfo";
import Probleme from "./Probleme";

export default async function Profil() {
    const probleme = await getProbleme()
    return(
        <div className='grid grid-cols-1 lg:grid-cols-[30%_auto] gap-3'>
            <ProfileInfo />
            <Probleme probleme={probleme} />
        </div>
    )
}