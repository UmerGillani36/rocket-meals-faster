export interface ManagementModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (email: string, password: string) => void;
}

export interface FormProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openSheet: () => void;
  openAttentionSheet: () => void;
  onSuccess: (token: string) => void;
}

export interface SheetProps {
  closeSheet: () => void;
  handleLogin: (email: string, password: string) => void;
}

export interface AttentionSheetProps {
  closeSheet: () => void;
  handleLogin: () => void;
}

