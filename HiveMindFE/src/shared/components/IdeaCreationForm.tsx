import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import "../../index.css";
import { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";

import { SaveIdeaData } from "../models/SaveIdeaData.model";
import ReactMarkdown from "react-markdown";
import Icon from "./Icon";
import { IdeaRequest } from "../models/IdeaRequest.model";
import { createIdea } from "../../services/IdeaService";
import { Idea } from "../models/Idea.model";
import { UserContext } from "../context/UserContext";

export default function IdeaCreationForm(props: { addIdea: (idea: Idea) => void }) {
  const [saveIdeaData, setsaveIdeaData] = useState<SaveIdeaData>({
    title: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Il campo Titolo non può essere vuoto";
        return "";
      },
    },
    description: {
      value: "",
      isDirty: false,
      validateCriteria: (value: string) => {
        if (value.length === 0) return "Il campo Descrizione non può essere vuoto";
        if (value.length > 400) return "Il campo Descrizione non può superare i 400 caratteri";
        return "";
      },
      length: 0,
    },
  });

  const maxLenght = 400;

  const userContext = useContext(UserContext);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const updatedData = { ...saveIdeaData };
      const changedIdInput = event.target.id as keyof SaveIdeaData;
      updatedData[changedIdInput].value = event.target.value;
      if (changedIdInput === "description") updatedData[changedIdInput].length = event.target.value.length;

      if (!updatedData[changedIdInput].isDirty) updatedData[changedIdInput].isDirty = true;
      setsaveIdeaData(updatedData);
    },
    [saveIdeaData]
  );

  const handlePostSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const ideaRequest: IdeaRequest = {
        title: saveIdeaData.title.value,
        description: saveIdeaData.description.value,
      };

      createIdea(ideaRequest).then((response) => {
        if (!userContext || !userContext.user) return;
        const ideaToAdd: Idea = {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          creationDate: response.data.creationDate,
          totalVotes: 0,
          upvotes: 0,
          downvotes: 0,
          User: userContext.user,
          Comments: [],
          Votes: [],
        };

        props.addIdea(ideaToAdd);
        setsaveIdeaData({
          title: {
            value: "",
            isDirty: false,
            validateCriteria: saveIdeaData.title.validateCriteria,
          },
          description: {
            value: "",
            isDirty: false,
            validateCriteria: saveIdeaData.description.validateCriteria,
            length: 0,
          },
        });
      });
    },
    [saveIdeaData]
  );

  return (
    <div className="w-full border-b border-b-5c5c5c ">
      <form className="w-full">
        <div className="flex flex-col ">
          <div className="flex flex-col border-b border-b-5c5c5c p-2  m-1">
            <input
              name="title"
              id="title"
              className="bg-zinc-900 lg:bg-black focus:outline-none"
              type="text"
              placeholder="Inserisci il titolo dell`idea"
              value={saveIdeaData.title.value}
              onChange={handleInputChange}
              aria-label="title"
            />
            {saveIdeaData.title.isDirty && saveIdeaData.title.validateCriteria?.(saveIdeaData.title.value) && (
              <span className="text-red-500 text-sm">
                {saveIdeaData.title.validateCriteria(saveIdeaData.title.value)}
              </span>
            )}
          </div>
          <div className="mx-5 border-b border-b-5c5c5c">
            <textarea
              rows={2}
              maxLength={maxLenght}
              name="description"
              id="description"
              className="bg-zinc-900 lg:bg-black p-2 focus:outline-none resize-none w-full"
              placeholder="Inserisci la descrizione dell`idea"
              value={saveIdeaData.description.value}
              onChange={handleInputChange}
              aria-label="description"
            />
            <div className="flex justify-end text-sm text-default-400">
              {saveIdeaData.description.length}/{maxLenght}
            </div>
            {saveIdeaData.description.isDirty &&
              saveIdeaData.description.validateCriteria?.(saveIdeaData.description.value) && (
                <span className="text-red-500 text-sm">
                  {saveIdeaData.description.validateCriteria(saveIdeaData.description.value)}
                </span>
              )}
            <Accordion isCompact className="w-auto">
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Anteprima in markdown:"
                indicator={({ isOpen }) => (isOpen ? <Icon icon="bi-code" /> : <Icon icon="bi-code-slash" />)}
              >
                <ReactMarkdown
                  className="whitespace-pre-wrap break-words max-h-28 overflow-y-auto"
                  components={{
                    a: ({ href, children }) => (
                      <Link href={href} color="secondary" underline="always" target="_blank" rel="noopener noreferrer">
                        {children}
                      </Link>
                    ),
                  }}
                >
                  {saveIdeaData.description.value}
                </ReactMarkdown>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex justify-end m-5">
          <Button radius="full" color="secondary" onClick={handlePostSubmit}>
            Posta
          </Button>
        </div>
      </form>
    </div>
  );
}
