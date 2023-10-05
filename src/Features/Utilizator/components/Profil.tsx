import ProfileInfo from "./ProfileInfo";

export default async function Profil() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_auto] gap-3">
      <ProfileInfo />
    </div>
  );
}
