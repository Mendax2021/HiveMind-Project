import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import IdeaCard from "./IdeaCard/IdeaCard";
import { IdeaStateData } from "../models/IdeaStateData.model";
import { getIdeas } from "../../services/IdeaService";
import { Spinner, useDisclosure } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { IdeaSearchRequest, IdeaType } from "../models/IdeaSearchRequest.model";
import { Vote } from "../models/Vote.model";
import { SearchFilterContext } from "../context/SearchFilterContext";
import IdeaCommentsModal from "./CommentsModal/IdeaCommentsModal";
import { Comment } from "../models/Comment.model";
import { IdeaModalContext } from "../context/modalContentContext";

import { Idea } from "../models/Idea.model";
import { AddIdeaContext } from "../context/FuncAddIdeaContext";
import IdeaCreationForm from "./IdeaCreationForm";

export default function IdeasContainer(props: { isUserProfile?: boolean }) {
  const [ideasPaginationData, setIdeasPaginationData] = useState<IdeaStateData>({
    content: [],
    totalPages: -1,
    page: 0,
    limit: 0,
    type: "",
  });

  const addIdeaFunc = useContext(AddIdeaContext);
  const searchFilterTypeContext = useContext(SearchFilterContext);
  const searchFilterType = searchFilterTypeContext?.filterType as IdeaType;

  const [loading, setLoading] = useState(false);
  const [modalCommentsContent, setModalCommentsContent] = useState<ReactNode>();
  const { userId } = useParams();
  const userIdNumber = userId ? parseInt(userId) : null;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const selectedIdeaId = useRef<number | null>(null);

  const changeCommentModalContent = useCallback((content: ReactNode) => {
    setModalCommentsContent(content);
  }, []);

  const addIdea = useCallback(
    (idea: Idea) => {
      if (!ideasPaginationData) return;
      const updatedPaginationData = { ...ideasPaginationData };
      updatedPaginationData.content.unshift(idea);
      setIdeasPaginationData(updatedPaginationData);
    },
    [ideasPaginationData]
  );

  // setto la funzione addIdea nel context per poterla utilizzare in AddIdeasModal
  useEffect(() => {
    if (addIdeaFunc && addIdeaFunc.setAddIdea && ideasPaginationData.content.length > 0)
      addIdeaFunc?.setAddIdea(addIdea);
  }, [addIdea]);

  const addVote = useCallback(
    (vote: Vote, voteIndex: number) => {
      const updatedPaginationData = { ...ideasPaginationData };
      const ideaIndex = updatedPaginationData.content.findIndex((idea) => idea.id === vote.ideaId);

      if (voteIndex === -1) {
        updatedPaginationData.content[ideaIndex].Votes.push(vote);
        updatedPaginationData.content[ideaIndex][vote.voteType === 1 ? "upvotes" : "downvotes"]++;
      } else if (vote.voteType === 1) {
        updatedPaginationData.content[ideaIndex].Votes[voteIndex].voteType = 1;
        updatedPaginationData.content[ideaIndex].downvotes--;
        updatedPaginationData.content[ideaIndex].upvotes++;
      } else {
        updatedPaginationData.content[ideaIndex].Votes[voteIndex].voteType = -1;
        updatedPaginationData.content[ideaIndex].downvotes++;
        updatedPaginationData.content[ideaIndex].upvotes--;
      }
      setIdeasPaginationData(updatedPaginationData);
    },
    [ideasPaginationData]
  );

  const removeVote = useCallback(
    (vote: Vote, voteIndex: number, ideaIndex: number) => {
      const updatedPaginationData = { ...ideasPaginationData };
      if (voteIndex !== -1) {
        updatedPaginationData.content[ideaIndex].Votes.splice(voteIndex, 1);
        updatedPaginationData.content[ideaIndex][vote.voteType === 1 ? "upvotes" : "downvotes"]--;
      }
      setIdeasPaginationData(updatedPaginationData);
    },
    [ideasPaginationData]
  );

  const setIdeaId = useCallback(
    (ideaId: number) => {
      selectedIdeaId.current = ideaId;
    },
    [selectedIdeaId]
  );

  const getSelectedIdea = useCallback(() => {
    if (!selectedIdeaId.current) return;

    return ideasPaginationData.content.find((idea) => idea.id === selectedIdeaId.current);
  }, [selectedIdeaId, ideasPaginationData.content]);

  const addComment = useCallback(
    (comment: Comment, ideaId: number) => {
      const updatedPaginationData = { ...ideasPaginationData };
      const ideaIndex = updatedPaginationData.content.findIndex((idea) => idea.id === ideaId);
      updatedPaginationData.content[ideaIndex].Comments.push(comment);
      setIdeasPaginationData(updatedPaginationData);
    },
    [ideasPaginationData]
  );

  const changeTempId = useCallback(
    (vote: Vote, voteIndex: number, ideaIndex: number) => {
      const updatedPaginationData = { ...ideasPaginationData };
      updatedPaginationData.content[ideaIndex].Votes[voteIndex].id = vote.id;
      setIdeasPaginationData(updatedPaginationData);
    },
    [ideasPaginationData]
  );

  const handleScroll = useCallback(() => {
    if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
      setLoading(true);
    }
  }, []);

  /** evito di chiamare la funzione handleScroll ad ogni scroll, ma solo dopo 500ms
   * in modo da evitare chiamate inutili al server */
  function debounce(func: () => void, delay: number): () => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return function (): void {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 500));
    return () => {
      window.removeEventListener("scroll", debounce(handleScroll, 500));
    };
  }, []);

  const fetchIdeas = useCallback(() => {
    /**
     * se ho finito le pagine da caricare e non è cambiato il tipo di ricerca che sto effettuando
     * il loading viene settato a false. Se invece cambia il tipo di ricerca, le nuove chiamate
     * ripartiranno dalla prima pagina
     */
    if (ideasPaginationData.page === ideasPaginationData.totalPages && ideasPaginationData.type === searchFilterType) {
      setLoading(false);
      return;
    }

    let ideaSearchRequest: IdeaSearchRequest = {
      page: ideasPaginationData.type !== searchFilterType ? 1 : ideasPaginationData.page + 1,
      type: searchFilterType,
    };

    if (props.isUserProfile) ideaSearchRequest.userId = userIdNumber;

    getIdeas(ideaSearchRequest)
      .then((response) => {
        setIdeasPaginationData((prevState) => {
          const newIdeas =
            prevState.content.length > 0 && prevState.type === searchFilterType
              ? response.data.content.filter((newIdea) => !prevState.content.some((idea) => idea.id === newIdea.id))
              : response.data.content;
          const updatedData = {
            content: ideasPaginationData.type !== searchFilterType ? newIdeas : [...prevState.content, ...newIdeas],
            totalPages: response.data.totalPages,
            page: response.data.page,
            limit: response.data.limit,
            type: response.data.type,
          };

          return updatedData;
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ideasPaginationData, searchFilterType, userIdNumber, props.isUserProfile]);

  useEffect(() => {
    if (loading) fetchIdeas();
  }, [loading]);

  useEffect(() => {
    if (searchFilterType) setLoading(true);
  }, [searchFilterType]);

  return (
    <div className=" flex flex-col gap-10 items-center py-5 md:p-5 min-h-screen">
      <div className="hidden lg:block w-full">{!props.isUserProfile && <IdeaCreationForm addIdea={addIdea} />}</div>
      {ideasPaginationData.content.length === 0 && !loading && <p>Non ci sono idee da visualizzare</p>}
      {ideasPaginationData.content.length > 0 &&
        ideasPaginationData?.content.map((idea, index) => (
          <IdeaCard
            idea={idea}
            key={idea.id}
            isUserProfile={props.isUserProfile}
            addVote={addVote}
            removeVote={removeVote}
            changeTempId={changeTempId}
            onModalOpen={onOpen}
            changeCommentModalContent={changeCommentModalContent}
            ideaIndex={index}
            addComment={addComment}
            setIdeaId={setIdeaId}
          />
        ))}
      {loading && <Spinner color="secondary" size="lg" />}
      <IdeaModalContext.Provider value={{ idea: getSelectedIdea() }}>
        <IdeaCommentsModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          bodyContent={modalCommentsContent}
          addComment={addComment}
        />
      </IdeaModalContext.Provider>
    </div>
  );
}
