import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileInfo from "./ProfileInfo";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { getServerSession } from "next-auth";

export default async function Profil() {
  const session = await getServerSession(authOptions);
  if (!session) return <></>;

  const { varsta, kg, inaltime } = session.user;
  console.log("inaltime", inaltime);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <ProfileInfo />

      <Card>
        <CardHeader className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col w-full">
              <p className="text-md">Recomandari AI</p>
            </div>
          </div>
          <Divider />
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3">
            <p>Greutate: {kg} kg</p>
            <p>Inaltime: {inaltime} inaltime</p>
            <p>Varsta: {varsta} ani</p>
            <p>DP: ok!</p>
          </div>
        </CardBody>

        <CardBody>
        Ziua 1: Antrenament cu Greutăți

<p></p>Squat cu Bara:

4 seturi x 8-10 repetări
Presă de Picior (Leg Press):

3 seturi x 10-12 repetări
Extensii la Aparat (Leg Extensions):

3 seturi x 12-15 repetări
Flexii la Aparat (Leg Curls):

3 seturi x 10-12 repetări
Ridicări de Gambață (Calf Raises):

4 seturi x 12-15 repetări




        </CardBody>
        
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col w-full">
              <p className="text-md">Recomandari echipa Edu-FitCare+</p>
            </div>
          </div>
          <Divider />
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3">Iti recomand sa mergi cel putin 10.000 pasi pe zi.</div>
        </CardBody>

        <CardBody>
          <div className="flex flex-col gap-3">Iti recomand sa bei minim 2l de apa pe zi.</div>
        </CardBody>
  
      </Card>
    </div>
  );
}
