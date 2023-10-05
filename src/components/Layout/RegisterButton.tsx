"use client";

import registerApi from "@/Features/Register/actions/register";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { ZodError, z } from "zod";

const registerSchema = z.object({
  nume: z
    .string()
    .min(2, "Numele trebuie sa aiba cel putin 2 caractere")
    .max(50, "Numele nu poate avea mai mult de 50 de caractere"),
  email: z.string().email("Email invalid"),
  password: z
    .string()
    .min(6, "Parola trebuie sa aiba cel putin 6 caractere")
    .max(50, "Parola nu poate avea mai mult de 50 de caractere"),
});

export default function RegisterButton() {
  const [pending, startTransition] = useTransition();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [registerData, setRegisterData] = useState({
    nume: "",
    email: "",
    password: "",
    varsta: "",
    kg: "",
    inaltime: "",
  });

  const updateRegisterData = (key: string, value: string) =>
    setRegisterData({ ...registerData, [key]: value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const request = async () => {
      registerSchema.parse(registerData);
      await registerApi(
        registerData.nume,
        registerData.email,
        registerData.password,
        registerData.varsta,
        registerData.kg,
        registerData.inaltime
      );
    };
    startTransition(() => {
      toast.promise(request(), {
        loading: "Se inregistreaza...",
        success: () => {
          onClose();
          setRegisterData({
            nume: "",
            email: "",
            password: "",
            varsta: "",
            kg: "",
            inaltime: "",
          });
          return "Te-ai inregistrat cu succes!";
        },
        error: (err) => {
          if (err instanceof ZodError) return err.issues[0].message;
          return err.message;
        },
      });
    });
  };

  return (
    <>
      <span onClick={onOpen} className="font-semibold cursor-pointer">
        Register
      </span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-black font-medium">Inregistrare</h2>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                placeholder="Nume"
                value={registerData.nume}
                onChange={(e) => updateRegisterData("nume", e.target.value)}
                type="text"
                label="Nume"
                name="nume"
                className="text-black"
              />
              <Input
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => updateRegisterData("email", e.target.value)}
                type="text"
                label="Email"
                name="email"
                className="text-black"
              />
              <Input
                placeholder="Parola"
                value={registerData.password}
                onChange={(e) => updateRegisterData("password", e.target.value)}
                label="Parola"
                type="password"
                name="password"
                className="text-black"
              />
              <Input
                placeholder="Varsta"
                value={registerData.varsta}
                onChange={(e) => updateRegisterData("varsta", e.target.value)}
                label="Varsta"
                type="text"
                name="varsta"
                className="text-black"
              />
              <Input
                placeholder="Greutate (kg)"
                value={registerData.kg}
                onChange={(e) => updateRegisterData("kg", e.target.value)}
                label="Greutate (kg)"
                type="text"
                name="kg"
                className="text-black"
              />
              <Input
                placeholder="Inaltime (cm)"
                value={registerData.inaltime}
                onChange={(e) => updateRegisterData("inaltime", e.target.value)}
                label="Inaltime (cm)"
                type="text"
                name="inaltime"
                className="text-black"
              />
              <Button
                disabled={pending}
                isLoading={pending}
                type="submit"
                color="primary"
                variant="solid"
              >
                {pending ? "Se inregistreaza..." : "Inregistreaza-te"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
