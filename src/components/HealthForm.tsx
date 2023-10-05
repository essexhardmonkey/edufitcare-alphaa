"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Data {
  nume: string;
  greutate: number;
  intaltime: number;
}

const HealthForm = () => {
  return (
    <div className="bg-blue-600 p-5 rounded-xl w-1/3">
      <Formik
        initialValues={{ nume: "", greutate: 0, intaltime: 0 }}
        validationSchema={Yup.object({
          nume: Yup.string().required("Numele este obligatoriu"),
          greutate: Yup.number()
            .required("Greutatea este obligatorie")
            .min(1, "Introduceti o greutate valida"),
          inaltime: Yup.number()
            .required("Inaltimea este obligatorie")
            .min(1, "Introduceti o valoarea valida."),
        })}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3 flex flex-col">
              <Field
                className="bg-blue-400 placeholder:text-black px-2 py-1 text-sm rounded-xl border border-blue-200/30 outline-none"
                placeholder="Numele dvs"
                type="text"
                name="nume"
              />
              <ErrorMessage className="text-red-400 text-sm" name="nume" />
            </div>

            <div className="mb-3 flex flex-col">
              <Field
                className="bg-blue-400 placeholder:text-black px-2 py-1 text-sm rounded-xl border border-blue-200/30 outline-none"
                placeholder="Greutatea dvs"
                type="number"
                name="greutate"
              />
              <ErrorMessage className="text-red-400 text-sm" name="greutate" />
            </div>

            <div className="mb-3 flex flex-col">
              <Field
                className="bg-blue-400 placeholder:text-black px-2 py-1 text-sm rounded-xl border border-blue-200/30 outline-none"
                placeholder="Inaltimea dvs"
                type="number"
                name="inaltime"
              />
              <ErrorMessage className="text-red-400 text-sm" name="inaltime" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Calculeaza
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HealthForm;
