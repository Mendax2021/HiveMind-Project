import { Accordion, AccordionItem, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Icon from "../Icon";
import { useState } from "react";

export default function InfoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="bottom-end"
      className="float-right dark"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button isIconOnly variant="light" radius="full">
          <Icon
            className={`text-2xl ${isOpen ? "text-secondary" : ""}`}
            icon={!isOpen ? "bi bi-info-circle" : "bi bi-info-circle-fill"}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 text-white border-2 border-5c5c5c max-w-[350px]">
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Rispetta gli altri utenti">
            <div className="max-h-28 overflow-y-auto">
              Evita di pubblicare contenuti offensivi, discriminatori o inappropriati. Le opinioni devono essere
              espresse in modo civile e rispettoso verso le idee e le persone degli altri utenti.
            </div>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Vota con onestà">
            <div className="max-h-28 overflow-y-auto">
              Esprimi il tuo voto in modo onesto. Utilizza le votazioni per indicaresei in accordo o disaccordo con le
              idee degli altri utenti, senza influenze esterne o intenzioni di manipolare la visibilità di un'idea. I
              voti hanno lo scopo di stimolare il confronto di opinioni e favorire un dibattito, non di penalizzare o
              promuovere indiscriminatamente.
            </div>
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Contribuisci con dei buoni contenuti">
            <div className="max-h-28 overflow-y-auto">
              Ogni contributo al social network dovrebbe avere lo scopo di arricchire la conversazione e favorire il
              confronto di idee. Pubblica idee e commenti che siano pertinenti, ben argomentati e che possano stimolare
              gli altri utenti aprendo così discussioni significative. Le tue idee e opinioni, anche quando critiche,
              dovrebbero sempre aggiungere valore al dialogo e aiutare gli altri a comprendere prospettive diverse.
            </div>
          </AccordionItem>
        </Accordion>
      </PopoverContent>
    </Popover>
  );
}
