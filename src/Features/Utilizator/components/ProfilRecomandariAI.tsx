"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import OpenAI from "openai";

interface Props {
  kg: number;
  inaltime: number;
  varsta: number;
}

const ProfilRecomandariAI = ({ kg, inaltime, varsta }: Props) => {
  const [recomandari, setRecomandari] = useState("");

  useEffect(() => {
    const fetchRecomandari = async () => {
      const recommData = await getDiet({ kg, inaltime, varsta });
      setRecomandari(recommData);
    };

    fetchRecomandari();
  }, [inaltime, kg, varsta]);

  return (
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

          <h1 className="mt-5">Recomandarea AI-ului</h1>
          <p>{recomandari}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProfilRecomandariAI;

async function getDiet({
  kg,
  inaltime,
  varsta,
}: {
  kg: number;
  inaltime: number;
  varsta: number;
}) {
  const apiAI = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
    dangerouslyAllowBrowser: true,
  });

  const bmi = kg / (inaltime / 100) ** 2;
  const question = `Ce regim alimentar ar trebui sa urmeze o persoana cu un BMI de ${bmi.toFixed(
    2
  )} si o varsta de ${varsta} ani?`;

  const response = await apiAI.chat.completions.create({
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return response.choices[0].message.content || "";
}
