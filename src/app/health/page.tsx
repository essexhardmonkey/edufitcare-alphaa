import HealthForm from "@/components/HealthForm";
import { returnPageTitle } from "@/utils/general";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: returnPageTitle("Health"),
};

export default async function Page() {
  return (
    <div className="container mx-auto">
      <HealthForm />
    </div>
  );
}
