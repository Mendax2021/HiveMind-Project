import { Button, Input, Link } from "@nextui-org/react";
import Icon from "../shared/components/Icon";
import { useCallback, useState } from "react";

export default function Signin() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  return (
    <div className="flex flex-col justify-center h-screen items-center space-y-4">
      <h1 className="text-4xl font-bold">Sign in</h1>
      <div className="flex flex-col items-center border-2 border-5c5c5c rounded-lg space-y-10 p-5 ">
        <Input
          label="Username"
          labelPlacement="outside"
          variant="bordered"
          size="lg"
          startContent={<Icon icon="bi-person" />}
        />
        <Input
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
        />
        <Button className=" font-bold text-large" radius="md" fullWidth color="secondary">
          Sign in
        </Button>
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
