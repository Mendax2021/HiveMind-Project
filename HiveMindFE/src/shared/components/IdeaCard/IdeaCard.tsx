import { Card, CardHeader, CardBody, CardFooter, Avatar, Link } from "@nextui-org/react";
import "../../../index.css";

import { Idea } from "../../models/Idea.model";
import { convertBase64ToFile } from "../../utils/file.utils";
import defaultImage from "../../../assets/defaultImage.png";
import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { pastTimeCalc } from "../../utils/pastTimeCalc.utils";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import { changeVote, deleteVote, saveVote } from "../../../services/VoteService";
import { generateRandomTempId } from "../../utils/generateRandomTempId.utils";
import { Vote } from "../../models/Vote.model";
import CommentButton from "./CommentButton";
import ModalContent from "../CommentsModal/ModalContent";
import { Comment } from "../../models/Comment.model";
import { SearchFilterContext } from "../../context/SearchFilterContext";
import ReactMarkdown from "react-markdown";

export default function IdeaCard(props: {
  idea: Idea;
  isUserProfile?: boolean;
  ideaIndex: number;
  addVote: (vote: Vote, voteIndex: number) => void;
  removeVote: (vote: Vote, voteIndex: number, ideaIndex: number) => void;
  changeTempId: (vote: Vote, voteIndex: number, ideaIndex: number) => void;
  onModalOpen: () => void;
  changeCommentModalContent: (content: ReactNode) => void;
  addComment: (comment: Comment, ideaId: number) => void;
  setIdeaId: (ideaId: number) => void;
}) {
  const userContext = useContext(UserContext);
  const searchFilterTypeContext = useContext(SearchFilterContext);

  const initializeState = useCallback(
    (type: number) => {
      if (!userContext || !userContext.user) return false;
      return props.idea.Votes.some((vote) => vote.userId === userContext.user?.id && vote.voteType === type);
    },
    [props.idea.Votes, userContext]
  );

  // setto lo stato iniziale dei bottoni like e dislike controllando se l`utente ha già votato
  const isLiked = useMemo(() => initializeState(1), [initializeState]);
  const isDisliked = useMemo(() => initializeState(-1), [initializeState]);

  const [buttonLikePressed, setbuttonLikePressed] = useState(isLiked);
  const [buttonDislikePressed, setbuttonDislikePressed] = useState(isDisliked);

  /**
   * Quando voteType non sarà passato sarà considerato undefined e di conseguenza sarà rimosso
   * lo stato di pressed dai bottoni like e dislike
   */
  const handleButtonState = useCallback((voteType?: number) => {
    setbuttonLikePressed(voteType === 1);
    setbuttonDislikePressed(voteType === -1);
  }, []);

  /**
   * per non bloccare l`utente mentre aspetta la risposta dal server aggiungo subito il
   *  voto dall`array con un id generato random. Questa operazione non causerà nessun problema
   * in quanto il voto sarà sovrascritto con l`id corretto una volta ricevuto dal server ed inoltre
   * l`id generato non è utilizzato per le operazioni di ricerca dato che si basano sull`id dell`utente
   */
  const increaseVote = useCallback(
    (voteType: number) => {
      if (!userContext || !userContext.user) return;
      const voteIndex = props.idea.Votes.findIndex((vote) => vote.userId === userContext.user?.id);
      const voteToAdd: Vote = {
        userId: userContext.user.id,
        voteType: voteType,
        id: generateRandomTempId(),
        ideaId: props.idea.id,
      };

      props.addVote(voteToAdd, voteIndex);
      handleButtonState(voteType);
      voteIndex === -1
        ? saveVote(voteType, props.idea.id).then((res) => {
            props.changeTempId(res.data, props.idea.Votes.length - 1, props.ideaIndex);
          })
        : changeVote(props.idea.Votes[voteIndex].id, voteType);
    },
    [userContext, props.idea, props.addVote, props.changeTempId, props.ideaIndex]
  );

  const decreaseVote = useCallback(() => {
    if (!userContext || !userContext.user) return;
    const voteIndex = props.idea.Votes.findIndex((vote) => vote.userId === userContext.user?.id);

    deleteVote(props.idea.Votes[voteIndex].id);
    props.removeVote(props.idea.Votes[voteIndex], voteIndex, props.ideaIndex);
    handleButtonState();
  }, [userContext, props.idea, props.removeVote, props.ideaIndex]);

  const onCommentButtonClick = useCallback(() => {
    props.setIdeaId(props.idea.id);
    props.onModalOpen();
    props.changeCommentModalContent(<ModalContent addComment={props.addComment} />);
  }, [props.onModalOpen, props.changeCommentModalContent, props.idea, props.setIdeaId, props.addComment]);

  return (
    <Card className="w-[90%] lg:w-[70%] h-[200px] max-w-[500px] bg-black border-2 border-5c5c5c ">
      <CardHeader className="justify-between">
        <div className="flex  w-full">
          <div>
            <Avatar
              isBordered
              radius="full"
              size="md"
              color="secondary"
              src={
                props.isUserProfile && userContext && userContext.user?.profileImage
                  ? convertBase64ToFile(userContext.user.profileImage, "profileImage")
                  : props.idea.User.profileImage
                  ? convertBase64ToFile(props.idea.User.profileImage, "profileImage")
                  : defaultImage
              }
            />
          </div>
          <div className="flex flex-col gap-1 items-start justify-center w-full px-5">
            <div className="flex justify-between w-full">
              <h4 className="text-xl font-semibold leading-none text-default-600">{props.idea.title}</h4>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-sm font-light">
                Di:{" "}
                {props.isUserProfile ? (
                  props.idea.User.userName
                ) : (
                  <Link
                    color="foreground"
                    underline="always"
                    href={`/profile/${props.idea.User.id}?type=${searchFilterTypeContext?.filterType}`}
                  >
                    {props.idea.User.userName}
                  </Link>
                )}
              </p>
              <p className="text-default-400">{pastTimeCalc(props.idea.creationDate)}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-default-400">
        {/* sovrascrivo il componente a di react-markdown per customizzarlo */}
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <Link href={href} color="secondary" underline="always" target="_blank" rel="noopener noreferrer">
                {children}
              </Link>
            ),
          }}
        >
          {props.idea.description}
        </ReactMarkdown>
      </CardBody>
      <CardFooter className="flex justify-between gap-3 px-5">
        <LikeButton
          upvotes={props.idea.upvotes}
          pressed={buttonLikePressed}
          increaseUpVote={increaseVote}
          decreaseUpVote={decreaseVote}
        />
        <DislikeButton
          downvotes={props.idea.downvotes}
          pressed={buttonDislikePressed}
          increaseDownVote={increaseVote}
          decreaseDownVote={decreaseVote}
        />
        <CommentButton idea={props.idea} onClick={onCommentButtonClick} />
      </CardFooter>
    </Card>
  );
}
