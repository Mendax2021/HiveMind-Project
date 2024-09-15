import { Button, Input, Link } from "@nextui-org/react";
import Icon from "../shared/components/Icon";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { SignUpData } from "../shared/models/SignUpData.model";
import { signUp } from "../services/AuthService";
import toast from "react-hot-toast";

export default function SignUp() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [signUpData, setSignupData] = useState<SignUpData>({
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
        if (
          value.length !== 0 &&
          signUpData.confirmPassword.value.length !== 0 &&
          value !== signUpData.confirmPassword.value
        )
          return "Le password non corrispondono";
        return "";
      },
    },
    confirmPassword: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Il campo Password non può essere vuoto";
        if (value.length !== 0 && signUpData.confirmPassword.value.length !== 0 && value !== signUpData.pwd.value)
          return "Le password non corrispondono";
        return "";
      },
    },
  });

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible]);
  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedFormData: SignUpData = { ...signUpData };
      //cast per far si che updateFormData accetti un key di SignupData
      //inoltre rinomino gli id per far si che combacino con le chiavi di SignupData
      const changedIdInput = event.target.id as keyof SignUpData;
      updatedFormData[changedIdInput].value = event.target.value;
      if (!updatedFormData[changedIdInput].isDirty) updatedFormData[changedIdInput].isDirty = true;
      setSignupData(updatedFormData);
    },
    [signUpData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const authRequest: AuthRequest = {
        usr: signUpData.usr.value,
        pwd: signUpData.pwd.value,
      };
      signUp(authRequest).then(() => {
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
    [signUpData]
  );

  const deleteUsername = useCallback(() => {
    const updatedFormData: SignUpData = { ...signUpData };
    updatedFormData.usr.value = "";
    setSignupData(updatedFormData);
  }, [signUpData]);

  return (
    <div className="flex flex-col justify-center min-h-screen items-center space-y-4">
      <h1 className="text-4xl font-bold">Sign up</h1>
      <div className="flex flex-col items-center border-2 border-5c5c5c rounded-lg p-5">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <Input
            isRequired
            id="usr"
            label="Username"
            labelPlacement="outside"
            variant="bordered"
            size="lg"
            startContent={<Icon icon="bi-person" />}
            endContent={
              signUpData.usr.value.length !== 0 && (
                <button tabIndex={-1} type="button" onClick={deleteUsername} aria-label="delete username">
                  <Icon icon="bi-x-circle" />
                </button>
              )
            }
            value={signUpData.usr.value}
            isInvalid={signUpData.usr.isDirty && !!signUpData.usr.validateCriteria?.(signUpData.usr.value)}
            errorMessage={signUpData.usr.isDirty && signUpData.usr.validateCriteria?.(signUpData.usr.value)}
            classNames={{
              errorMessage: "max-w-64",
            }}
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
              <button tabIndex={-1} type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                <Icon icon={isVisible ? "bi-eye" : "bi-eye-slash"} />
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={signUpData.pwd.value}
            isInvalid={signUpData.pwd.isDirty && !!signUpData.pwd.validateCriteria?.(signUpData.pwd.value)}
            errorMessage={signUpData.pwd.isDirty && signUpData.pwd.validateCriteria?.(signUpData.pwd.value)}
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
              <button tabIndex={-1} type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                <Icon icon={isVisible ? "bi-eye" : "bi-eye-slash"} />
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={signUpData.confirmPassword.value}
            isInvalid={
              signUpData.confirmPassword.isDirty &&
              !!signUpData.confirmPassword.validateCriteria?.(signUpData.confirmPassword.value)
            }
            errorMessage={
              signUpData.confirmPassword.isDirty &&
              signUpData.confirmPassword.validateCriteria?.(signUpData.confirmPassword.value)
            }
            onChange={handleInputChange}
          />
          <Button type="submit" className="font-bold text-large" radius="md" fullWidth color="secondary">
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
