"use client";

import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import editeazaProfilul from "../actions/editProfile";

const profileSchema = z.object({
  varsta: z.number().min(2, "Varsta trebuie sa fie mai mare decat 1"),
  kg: z.number().min(1, "Kilogramele trebuie sa fie mai mari decat 0"),
  stilSportiv: z
    .string()
    .min(2, "Stilul sportiv trebuie sa aiba cel putin 2 caractere")
    .max(50, "Stilul sportiv nu poate avea mai mult de 50 de caractere"),
  locatie: z
    .string()
    .min(2, "Locatia trebuie sa aiba cel putin 2 caractere")
    .max(50, "Locatia nu poate avea mai mult de 50 de caractere"),
});

export default function EditeazaProfilulBtn({ session }: { session: User }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    varsta: Number(session.varsta),
    stilSportiv: session.stilSportiv,
    locatie: session.locatie,
    kg: Number(session.kg),
    // sex: session.sex,
  });

  const updateUserInfo = (key: string, value: string) => {
    if (key === "varsta" || key === "kg") {
      setUserInfo({ ...userInfo, [key]: Number(value) });
    } else {
      setUserInfo({ ...userInfo, [key]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const request = async () => {
      profileSchema.parse({
        ...userInfo,
      });
      await editeazaProfilul(
        // userInfo.sex,
        userInfo.varsta,
        userInfo.stilSportiv,
        userInfo.locatie,
        userInfo.kg
      );
    };

    startTransition(() => {
      toast.promise(request(), {
        loading: "Se editeaza profilul...",
        success: () => {
          onClose();
          router.refresh();
          return "Profilul a fost editat cu succes!";
        },
        error: (err) => {
          if (err instanceof z.ZodError) return err.issues[0].message;
          return err.message;
        },
      });
    });
  };

  return (
    <>
      <Tooltip showArrow content="Editeaza profilul" className="text-black">
        <span onClick={onOpen} className="font-semibold cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </span>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-black font-medium">Editeaza profilul</h2>
            <Divider />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                value={userInfo.varsta.toString()}
                onChange={(e) => updateUserInfo("varsta", e.target.value)}
                type="number"
                label="Varsta"
                name="Varsta"
                className="text-black"
              />
              <Input
                value={userInfo.kg.toString()}
                onChange={(e) => updateUserInfo("kg", e.target.value)}
                type="number"
                label="KG"
                name="KG"
                className="text-black"
              />
              <Input
                value={userInfo.stilSportiv}
                onChange={(e) => updateUserInfo("stilSportiv", e.target.value)}
                type="text"
                label="Stil sportiv"
                name="stilSportiv"
                className="text-black"
              />
              <Input
                value={userInfo.locatie}
                onChange={(e) => updateUserInfo("locatie", e.target.value)}
                type="text"
                label="Locatie"
                name="locatie"
                className="text-black"
              />
              <Button
                disabled={pending}
                isLoading={pending}
                type="submit"
                color="primary"
                variant="solid"
              >
                {pending ? "Se editeaza..." : "Editeaza"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
