// src/components/Sidebar.tsx
import { sidebarMenuItems } from "../../constants/menuItems.tsx";
import logo from "../../../assets/Logo.png";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import Icon from "../Icon.tsx";
import ProfileButton from "./ProfileButton.tsx";

export default function Sidebar(props: { direction: "left" | "right" }) {
  const currentPath = useLocation();
  return (
    <>
      {props.direction === "left" ? (
        <div className="left-0 fixed flex flex-col h-screen w-2/12 items-center border-r-2 border-r-5c5c5c">
          <div className=" w-full border-b-[1px] border-b-5c5c5c">
            <img src={logo} alt="Logo" />
          </div>
          <div className="pb-7 h-full w-full flex flex-col justify-between items-center ">
            <div className="w-full">
              <Listbox variant="flat" aria-label="Menu">
                {sidebarMenuItems.map((menuItem) => (
                  <ListboxItem key={menuItem.key} href={menuItem.link}>
                    <div className="flex text-2xl">
                      <span className="ml-2 mr-5">
                        <Icon
                          icon={currentPath.pathname.includes(menuItem.link) ? `${menuItem.icon}-fill` : menuItem.icon}
                        />
                      </span>
                      <span className="">{menuItem.label}</span>
                    </div>
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
            <div className="w-full flex flex-col gap-4 items-center">
              <span>
                <Button className="px-[3rem] font-bold text-large" radius="full" color="secondary">
                  Posta
                </Button>
              </span>
              <div className="relative w-full">
                <ProfileButton></ProfileButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="right-0 fixed flex flex-col h-screen w-3/12 items-center border-l-2 border-l-5c5c5c">
          <div className="py-[2rem] px-[3rem] h-full w-full flex flex-col gap-10 items-center ">
            <Card className="w-full border-5c5c5c mx-4">
              <CardHeader className="flex justify-center font-bold text-xl">
                <h3>Criteri di ricerca</h3>
              </CardHeader>
              <CardBody>
                <RadioGroup color="secondary">
                  <Radio value="controversial">Controverse</Radio>
                  <Radio value="unpopular">Unpopular</Radio>
                  <Radio value="mainstream">Mainstream</Radio>
                </RadioGroup>
              </CardBody>
            </Card>

            <Card className=" w-full border-5c5c5c mx-4 flex">
              <CardHeader className="flex justify-center font-bold text-xl">
                <h3>Linee Guida</h3>
              </CardHeader>
              <CardBody>
                <Accordion>
                  <AccordionItem key="1" aria-label="Accordion 1" title="Rispetta gli altri utenti">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat praesentium, dicta tempore
                    voluptates maxime dolorem velit sapiente officia soluta reprehenderit inventore necessitatibus quas
                    corporis incidunt quisquam suscipit deleniti obcaecati eveniet?
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="Accordion 2" title="Vota con onestà">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ex optio voluptate praesentium,
                    omnis quam nobis cumque autem id rem facilis amet, aut a? Impedit ad natus adipisci molestiae quod!
                  </AccordionItem>
                  <AccordionItem key="3" aria-label="Accordion 3" title="Contribuisci con dei buoni contenuti">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus dolore aut atque deserunt
                    veniam natus adipisci aliquid rem error iure. Quo corrupti numquam velit atque ab quis officia harum
                    quisquam.
                  </AccordionItem>
                </Accordion>
              </CardBody>
            </Card>
          </div>
          <footer className="flex flex-col items-center w-full mx-4 my-10 bottom-0 text-xs">
            <div className="flex flex-col items-center">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
            <div>
              <p>© 2024 HIVEMIND. Tutti i diritti sono riservati</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
