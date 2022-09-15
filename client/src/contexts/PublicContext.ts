import { IUser } from "models/IUser";
import { createContext, Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import { IAppSettings } from "models/IAppSettings";

export interface MetaInterface {
  description?: string;
  keywords?: string;
  title?: string;
  url?: string;
}

interface IPublicContext {
  meta?: MetaInterface;
  setMeta: Dispatch<SetStateAction<MetaInterface | undefined>>;
  appSettings: IAppSettings | undefined;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  socket: Socket | null;
  logout: () => void;
  redirect: (path: string, external?: boolean) => void;
  redirectToExternalAuth: (type: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  language?: string;
  setLanguage: Dispatch<SetStateAction<string | undefined>>;
  /*    handleOpenLanguageChooserDialog: () => void;*/
  networkError: boolean;
  isMobile: boolean;
  /*    authSettings: IAuthSettings;*/
}

const PublicContext = createContext<IPublicContext>({
  meta: undefined,
  setMeta: () => undefined,
  appSettings: undefined,
  user: null,
  setUser: () => {},
  socket: null,
  logout: () => {},
  redirect: (path, external) => {},
  redirectToExternalAuth: (type) => {},
  isSidebarOpen: false,
  setSidebarOpen: () => {},
  language: "da",
  setLanguage: () => {},
  /*    handleOpenLanguageChooserDialog: () => {
          },*/
  networkError: false,
  isMobile: false,
  /*    authSettings: null,*/
});

export default PublicContext;
