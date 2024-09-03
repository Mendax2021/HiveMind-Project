import { Button, Input, Link } from "@nextui-org/react";
import Icon from "../shared/components/Icon";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { AuthRequest, SignupData } from "../shared/models/AuthRequest.model";
import { signup } from "../services/AuthService";
import toast from "react-hot-toast";

export default function Signup() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [signupData, setSignupData] = useState<SignupData>({
    usr: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        const regex = /^[^a-zA-Z0-9]*$/;
        if (value.length === 0) return "Il campo Username non può essere vuoto";
        if (regex.test(value)) return "Il campo Username non può contenere SOLO caratteri speciali";
        return "";
      },
    },
    pwd: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Il campo Password non può essere vuoto";
        if (value === signupData.confirmPassword.value) return "Le password non corrispondono";
        return "";
      },
    },
    confirmPassword: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Il campo Password non può essere vuoto";
        if (value === signupData.confirmPassword.value) return "Le password non corrispondono";
        return "";
      },
    },
  });

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible]);
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedFormData: SignupData = { ...signupData };
      //cast per far si che updateFormData accetti un key di SignupData
      //inoltre rinomino gli id per far si che combacino con le chiavi di SignupData
      const changedIdInput = event.target.id as keyof SignupData;
      updatedFormData[changedIdInput].value = event.target.value;
      if (!updatedFormData[changedIdInput].isDirty) updatedFormData[changedIdInput].isDirty = true;
      setSignupData(updatedFormData);
    },
    [signupData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      // const confirmPwd = signupData.confirmPassword;
      const authRequest: AuthRequest = {
        usr: signupData.usr.value,
        pwd: signupData.pwd.value,
      };
      signup(authRequest).then(() => {
        toast.custom(
          <div className="toaster-animation rounded-xl flex bg-success items-center p-2 gap-3">
            <div>
              <Icon className="text-2xl" icon="bi-check-circle" />
            </div>
            <div className="toaster-animation flex flex-col items-center">
              <p>Hai effettuato la registrazione con successo.</p>
              <Link className="ml-2 underline text-white" href="/signin" showAnchorIcon>
                Accedi
              </Link>
            </div>
          </div>,
          { duration: 2000 }
        );
      });
    },
    [signupData]
  );

  return (
    <div className="flex flex-col justify-center min-h-screen items-center space-y-4">
      <h1 className="text-4xl font-bold">Sign up</h1>
      <div className="flex flex-col items-center border-2 border-5c5c5c rounded-lg  p-5 ">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <Input
            isRequired
            id="usr"
            label="Username"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            startContent={<Icon icon="bi-person" />}
            value={signupData.usr.value}
            isInvalid={signupData.usr.isDirty && !!signupData.usr.validateCriteria(signupData.usr.value)}
            errorMessage={signupData.usr.isDirty && signupData.usr.validateCriteria(signupData.usr.value)}
            onChange={handleInputChange}
          />
          <Input
            isRequired
            id="pwd"
            label="Password"
            variant="bordered"
            labelPlacement="outside"
            size="lg"
            startContent={<Icon icon="bi-key" />}
            endContent={
              <button type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                <Icon icon={isVisible ? "bi-eye" : "bi-eye-slash"} />
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={signupData.pwd.value}
            isInvalid={signupData.pwd.isDirty && !!signupData.pwd.validateCriteria(signupData.pwd.value)}
            errorMessage={signupData.pwd.isDirty && signupData.pwd.validateCriteria(signupData.pwd.value)}
            onChange={handleInputChange}
          />
          <Input
            isRequired
            id="confirmPassword"
            label="Conferma Password"
            variant="bordered"
            labelPlacement="outside"
            size="lg"
            startContent={<Icon icon="bi-key" />}
            endContent={
              <button type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                <Icon icon={isVisible ? "bi-eye" : "bi-eye-slash"} />
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={signupData.confirmPassword.value}
            isInvalid={
              signupData.confirmPassword.isDirty &&
              !!signupData.confirmPassword.validateCriteria(signupData.confirmPassword.value)
            }
            errorMessage={signupData.confirmPassword.validateCriteria(signupData.confirmPassword.value)}
            onChange={handleInputChange}
          />
          <Button type="submit" className=" font-bold text-large" radius="md" fullWidth color="secondary">
            Sign up
          </Button>
        </form>
      </div>
      <p>
        Sei già registrato?
        <Link color="secondary" className="ml-2 underline" href="/signin" showAnchorIcon>
          Accedi
        </Link>
      </p>
    </div>
  );
}
