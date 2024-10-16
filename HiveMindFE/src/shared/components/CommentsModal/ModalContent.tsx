import { Avatar, Button, Input, Link } from "@nextui-org/react";
import { convertBase64ToFile } from "../../utils/file.utils";
import defaultImage from "../../../assets/defaultImage.png";
import "../../../index.css";
import { pastTimeCalc } from "../../utils/pastTimeCalc.utils";
import Icon from "../Icon";
import { InputField } from "../../models/InputField.model";
import { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";
import { addComment } from "../../../services/CommentService";
import { Comment } from "../../models/Comment.model";
import { UserContext } from "../../context/UserContext";
import { IdeaModalContext } from "../../context/modalContentContext";
import ReactMarkdown from "react-markdown";

export default function ModalContent(props: { addComment: (comment: Comment, ideaId: number) => void }) {
  const [commentData, setCommentData] = useState<InputField<string>>({
    value: "",
    isDirty: false,
    validateCriteria: (value: string) => {
      const regex = /^[^a-zA-Z0-9]*$/;
      if (value.length === 0) return "Il campo Commento non può essere vuoto";
      if (regex.test(value)) return "Il campo Commento non può contenere SOLO caratteri speciali";
      return "";
    },
  });

  const userContext = useContext(UserContext);
  const ideaModalContext = useContext(IdeaModalContext);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedData = { ...commentData };
      updatedData.value = event.target.value;
      if (!updatedData.isDirty) updatedData.isDirty = true;
      setCommentData(updatedData);
    },
    [commentData]
  );

  const handleCommentSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      if (ideaModalContext && ideaModalContext.idea) {
        const idea = ideaModalContext.idea;
        addComment(commentData.value, idea.id).then((res) => {
          if (!userContext || !userContext.user) return;
          const updatedData = { ...res.data };
          updatedData.User = {
            userName: userContext.user.userName,
            profileImage: userContext.user.profileImage,
          };
          props.addComment(updatedData, idea.id);
          setCommentData({ value: "", isDirty: false, validateCriteria: commentData.validateCriteria });
        });
      }
    },
    [commentData, ideaModalContext, props.addComment]
  );

  return (
    <>
      {ideaModalContext && ideaModalContext.idea && (
        <>
          <div className="lg:flex h-[60vh] lg:block hidden">
            <div className="flex flex-col  lg:w-[50%] lg:justify-center lg:border-r lg:border-r-5c5c5c ">
              <h2 className="text-xl font-bold">{ideaModalContext.idea.title}</h2>
              <div className="overflow-auto">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <Link href={href} color="secondary" underline="always" target="_blank" rel="noopener noreferrer">
                        {children}
                      </Link>
                    ),
                  }}
                >
                  {ideaModalContext.idea.description}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex flex-col lg:w-[50%] ">
              <div className="flex gap-2 items-center lg:border-b lg:border-r lg:border-b-r-5c5c5c border-t border-b border-b-t-5c5c5c ">
                <Avatar
                  className="m-2"
                  isBordered
                  radius="full"
                  size="sm"
                  color="secondary"
                  src={
                    ideaModalContext.idea.User.profileImage
                      ? convertBase64ToFile(ideaModalContext.idea.User.profileImage, "profileImage")
                      : defaultImage
                  }
                />
                <div className="flex flex-col">
                  <p className="text-sm">Idea di:</p>
                  <h3 className="font-bold">{ideaModalContext.idea.User.userName}</h3>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-2 h-full overflow-y-auto ">
                {ideaModalContext.idea.Comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2 items-center my-2">
                    <div>
                      <Avatar
                        radius="full"
                        size="sm"
                        color="secondary"
                        src={
                          comment.User.profileImage
                            ? convertBase64ToFile(comment.User.profileImage, "profileImage")
                            : defaultImage
                        }
                      />
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <div className="flex justify-between ">
                        <div className="text-sm">
                          <span>Di: </span>
                          <span className="font-semibold">{comment.User.userName}</span>
                        </div>
                        <p className="text-default-400 text-">{pastTimeCalc(comment.creationDate)}</p>
                      </div>

                      <p className="text-lg">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form
                className=" flex px-3 py-2 border-t lg:border-r lg:border-t-r-5c5c5c border-t-5c5c5c"
                onSubmit={handleCommentSubmit}
              >
                <Input
                  color="secondary"
                  type="text"
                  variant="underlined"
                  placeholder="Inserisci il tuo commento"
                  value={commentData.value}
                  onChange={handleInputChange}
                  isInvalid={commentData.isDirty && !!commentData.validateCriteria?.(commentData.value)}
                  errorMessage={commentData.isDirty && commentData.validateCriteria?.(commentData.value)}
                  classNames={{
                    errorMessage: "max-w-96",
                  }}
                />
                <Button
                  color="secondary"
                  className="text-default-400 hover:text-secondary"
                  isIconOnly
                  variant="light"
                  radius="full"
                  type="submit"
                >
                  <Icon className="text-xl" icon="bi-send" />
                </Button>
              </form>
            </div>
          </div>
          {/* Mobile view */}
          <div className="flex flex-col lg:hidden h-[70vh]">
            <div className="flex gap-2 items-center border-t border-b border-b-t-5c5c5c ">
              <Avatar
                className="m-2"
                isBordered
                radius="full"
                size="sm"
                color="secondary"
                src={
                  ideaModalContext.idea.User.profileImage
                    ? convertBase64ToFile(ideaModalContext.idea.User.profileImage, "profileImage")
                    : defaultImage
                }
              />
              <div className="flex flex-col">
                <p className="text-sm">Idea di:</p>
                <h3 className="font-bold">{ideaModalContext.idea.User.userName}</h3>
              </div>
            </div>
            <div className="flex flex-col border-b border-b-5c5c5c p-5">
              <h2 className="text-xl font-bold">{ideaModalContext.idea.title}</h2>
              <div className="overflow-auto">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <Link href={href} color="secondary" underline="always" target="_blank" rel="noopener noreferrer">
                        {children}
                      </Link>
                    ),
                  }}
                >
                  {ideaModalContext.idea.description}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-2 h-full overflow-y-auto ">
              {ideaModalContext.idea.Comments.map((comment) => (
                <div key={comment.id} className="flex gap-2 items-center my-2">
                  <div>
                    <Avatar
                      radius="full"
                      size="sm"
                      color="secondary"
                      src={
                        comment.User.profileImage
                          ? convertBase64ToFile(comment.User.profileImage, "profileImage")
                          : defaultImage
                      }
                    />
                  </div>
                  <div className="flex flex-col w-full mb-2">
                    <div className="flex justify-between ">
                      <div className="text-sm">
                        <span>Di: </span>
                        <span className="font-semibold">{comment.User.userName}</span>
                      </div>
                      <p className="text-default-400 text-">{pastTimeCalc(comment.creationDate)}</p>
                    </div>
                    <p className="text-lg">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <form
              className=" flex px-3 py-2 border-t lg:border-r lg:border-t-r-5c5c5c border-t-5c5c5c"
              onSubmit={handleCommentSubmit}
            >
              <Input
                color="secondary"
                type="text"
                variant="underlined"
                placeholder="Inserisci il tuo commento"
                value={commentData.value}
                onChange={handleInputChange}
                isInvalid={commentData.isDirty && !!commentData.validateCriteria?.(commentData.value)}
                errorMessage={commentData.isDirty && commentData.validateCriteria?.(commentData.value)}
                classNames={{
                  errorMessage: "max-w-96",
                }}
                aria-label="comment"
              />
              <Button
                color="secondary"
                className="text-default-400 hover:text-secondary"
                isIconOnly
                variant="light"
                radius="full"
                type="submit"
              >
                <Icon className="text-xl" icon="bi-send" />
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
