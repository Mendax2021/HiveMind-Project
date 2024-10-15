// src/components/Sidebar.tsx
import { sidebarMenuItems } from "../../constants/menuItems.tsx";
import logo from "../../../assets/Logo.png";
import {
  Accordion,
  AccordionItem,
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
import { useContext } from "react";
import { SearchFilterContext } from "../../context/SearchFilterContext.ts";

export default function Sidebar(props: { direction: "left" | "right" }) {
  const currentPath = useLocation();
  const searchTypeContext = useContext(SearchFilterContext);

  return (
    <>
      {props.direction === "left" ? (
        <div className="hidden lg:flex col-span-2 sticky top-0 flex-col h-screen items-center border-r-2 border-r-5c5c5c">
          <div className=" flex justify-center w-full border-b-[1px] border-b-5c5c5c">
            <img className="w-44" src={logo} alt="Logo" draggable="false" />
          </div>
          <div className="pb-7 h-full w-full flex flex-col justify-between items-center ">
            <div className="w-full">
              <Listbox variant="flat" aria-label="menu">
                {sidebarMenuItems.map((menuItem) => (
                  <ListboxItem
                    key={menuItem.key}
                    href={`${menuItem.link}?type=${searchTypeContext?.filterType}`}
                    textValue={menuItem.label}
                  >
                    <div className=" flex justify-center text-2xl">
                      <span className="mr-3">
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
              <div className="relative w-full p-4">
                <ProfileButton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:block col-span-3 ">
          <div className="flex col-span-3 sticky top-0 flex-col min-h-screen items-center border-l-2 border-l-5c5c5c">
            <div className="py-[2rem] px-[3rem] h-full w-full flex flex-col gap-10 items-center ">
              <Card className="w-full border-5c5c5c mx-4 bg-black">
                <CardHeader className="flex justify-center font-bold text-xl">
                  <h3>Criteri di ricerca</h3>
                </CardHeader>
                <CardBody>
                  <RadioGroup
                    color="secondary"
                    value={searchTypeContext?.filterType}
                    onValueChange={searchTypeContext?.setFilterType}
                  >
                    <Radio value="controversial" aria-label="Controversial">
                      Controverse
                    </Radio>
                    <Radio value="unpopular" aria-label="unpopular">
                      Unpopular
                    </Radio>
                    <Radio value="mainstream" aria-label="mainstream">
                      Mainstream
                    </Radio>
                  </RadioGroup>
                </CardBody>
              </Card>

              <Card className=" w-full border-5c5c5c mx-4 flex bg-black">
                <CardHeader className="flex justify-center font-bold text-xl">
                  <h3>Linee Guida</h3>
                </CardHeader>
                <CardBody>
                  <Accordion>
                    <AccordionItem
                      key="1"
                      aria-label="Accordion 1"
                      title="Rispetta gli altri utenti"
                      textValue="Rispetta gli altri utenti"
                    >
                      <div className="max-h-28 overflow-y-auto">
                        Evita di pubblicare contenuti offensivi, discriminatori o inappropriati. Le opinioni devono
                        essere espresse in modo civile e rispettoso verso le idee e le persone degli altri utenti.
                      </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 2" title="Vota con onestà" textValue="Vota con onestà">
                      <div className="max-h-28 overflow-y-auto">
                        Esprimi il tuo voto in modo onesto. Utilizza le votazioni per indicaresei in accordo o
                        disaccordo con le idee degli altri utenti, senza influenze esterne o intenzioni di manipolare la
                        visibilità di un'idea. I voti hanno lo scopo di stimolare il confronto di opinioni e favorire un
                        dibattito, non di penalizzare o promuovere indiscriminatamente.
                      </div>
                    </AccordionItem>
                    <AccordionItem
                      key="3"
                      aria-label="Accordion 3"
                      title="Contribuisci con dei buoni contenuti"
                      textValue="Contribuisci con dei buoni contenuti"
                    >
                      <div className="max-h-28 overflow-y-auto">
                        Ogni contributo al social network dovrebbe avere lo scopo di arricchire la conversazione e
                        favorire il confronto di idee. Pubblica idee e commenti che siano pertinenti, ben argomentati e
                        che possano stimolare gli altri utenti aprendo così discussioni significative. Le tue idee e
                        opinioni, anche quando critiche, dovrebbero sempre aggiungere valore al dialogo e aiutare gli
                        altri a comprendere prospettive diverse.
                      </div>
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
        </div>
      )}
    </>
  );
}
