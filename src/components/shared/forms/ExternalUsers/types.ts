export interface IExternalUsers {
  id: string;
  role: string;
  emails?: string;
}

export interface IExternalUser extends IExternalUsers {
  handleSelector: (shownName: string, id: string) => void;
  handleEmailChange: (e: React.ChangeEvent<any>, id: string) => void;
}
