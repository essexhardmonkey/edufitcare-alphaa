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
            <p>Greutate: {kg}</p>
            <p>Inaltime: {inaltime}</p>
            <p>Varsta: {varsta}</p>
          </div>
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
          <div className="flex flex-col gap-3">Curand...</div>
        </CardBody>
      </Card>
    </div>
  );
}
