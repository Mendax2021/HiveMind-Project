export interface Comment {
  id: number;
  content: string;
  creationDate: string;
  updatedAt: string;
  User: {
    userName: string;
    profileImage: string;
  };
}
