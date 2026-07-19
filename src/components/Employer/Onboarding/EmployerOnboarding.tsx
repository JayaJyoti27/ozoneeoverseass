import { useState } from "react";

import { Card } from "@/components/ui/card";

import { defaultEmployerForm } from "./mock";

import { Stepper } from "./Stepper";

import { CompanyInformationStep } from "./CompanyInformationStep";
import { ContactInformationStep } from "./ContactInformationStep";
import { CompanyAddressStep } from "./CompanyAddressStep";
import { BusinessRegistrationStep } from "./BusinessRegistrationStep";
import { DocumentsStep } from "./DocumentsStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessStep } from "./SuccessStep";

export function EmployerOnboarding() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState(defaultEmployerForm);

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <Stepper currentStep={step} />

      <Card className="p-8">
        {step === 1 && (
          <CompanyInformationStep form={form} setForm={setForm} next={() => setStep(2)} />
        )}

        {step === 2 && (
          <ContactInformationStep
            form={form}
            setForm={setForm}
            next={() => setStep(3)}
            back={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <CompanyAddressStep
            form={form}
            setForm={setForm}
            next={() => setStep(4)}
            back={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <BusinessRegistrationStep
            form={form}
            setForm={setForm}
            next={() => setStep(5)}
            back={() => setStep(3)}
          />
        )}

        {step === 5 && <DocumentsStep next={() => setStep(6)} back={() => setStep(4)} />}

        {step === 6 && <ReviewStep form={form} next={() => setStep(7)} back={() => setStep(5)} />}

        {step === 7 && <SuccessStep />}
      </Card>
    </div>
  );
}
