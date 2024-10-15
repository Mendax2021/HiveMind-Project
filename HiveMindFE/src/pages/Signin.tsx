import { Button, Input, Link } from "@nextui-org/react";
import Icon from "../shared/components/Icon";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { SignInData } from "../shared/models/SignInData.model";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { signIn } from "../services/AuthService";

export default function SignIn() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [signInData, setSignInData] = useState<SignInData>({
    usr: {
      value: "",
      isDirty: false, //utile a verificare se il campo è stato toccato o meno
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
        return "";
      },
    },
  });

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedFormData: SignInData = { ...signInData };
      //cast necessario in qunato event.target.id è di tipo string e TS non lo riconosce come chiave di SignInData ( quando invece lo è)
      const changedIdInput = event.target.id as keyof SignInData;
      updatedFormData[changedIdInput].value = event.target.value;
      if (!updatedFormData[changedIdInput].isDirty) updatedFormData[changedIdInput].isDirty = true;
      setSignInData(updatedFormData);
    },
    [signInData]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const authRequest: AuthRequest = {
        usr: signInData.usr.value,
        pwd: signInData.pwd.value,
      };
      signIn(authRequest).then((response) => {
        localStorage.setItem("token", response.data.token);
        //aggiungo evento per permettere il rerender della pagina al cambiare del local storage
        window.dispatchEvent(new Event("storage"));
      });
    },
    [signInData]
  );

  const deleteUsername = useCallback(() => {
    const updatedFormData: SignInData = { ...signInData };
    updatedFormData.usr.value = "";
    setSignInData(updatedFormData);
  }, [signInData]);

  return (
    <div className="flex flex-col justify-center min-h-screen items-center space-y-4">
      <h1 className="text-4xl font-bold">Sign in</h1>
      <div className="flex flex-col items-center border-2 border-5c5c5c rounded-lg p-5 ">
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
              signInData.usr.value.length !== 0 && (
                <button tabIndex={-1} type="button" onClick={deleteUsername} aria-label="delete username">
                  <Icon icon="bi-x-circle" />
                </button>
              )
            }
            onChange={handleInputChange}
            value={signInData.usr.value}
            isInvalid={signInData.usr.isDirty && !!signInData.usr.validateCriteria?.(signInData.usr.value)}
            errorMessage={signInData.usr.isDirty && signInData.usr.validateCriteria?.(signInData.usr.value)}
            classNames={{
              errorMessage: "max-w-64",
            }}
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
            onChange={handleInputChange}
            value={signInData.pwd.value}
            isInvalid={signInData.pwd.isDirty && !!signInData.pwd.validateCriteria?.(signInData.pwd.value)}
            errorMessage={signInData.pwd.isDirty && signInData.pwd.validateCriteria?.(signInData.pwd.value)}
          />
          <Button type="submit" className="font-bold text-large" radius="md" fullWidth color="secondary">
            Sign in
          </Button>
        </form>
      </div>
      <p>
        Non sei registrato?
        <Link color="secondary" className="ml-2 underline" href="/signup" showAnchorIcon>
          Registrati
        </Link>
      </p>
    </div>
  );
}
