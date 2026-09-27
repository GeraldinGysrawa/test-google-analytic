"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getDefaultContent,
  loadClientContent,
  resetClientContent,
  saveClientContent,
} from "@/lib/content";
import type { PortfolioContent } from "@/lib/types";

type ContentContextValue = {
  content: PortfolioContent;
  setContent: (next: PortfolioContent) => void;
  saveContent: (next: PortfolioContent) => void;
  resetContent: () => void;
  hydrated: boolean;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(getDefaultContent());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setContent(loadClientContent());
    setHydrated(true);
  }, []);

  const saveContent = useCallback((next: PortfolioContent) => {
    setContent(next);
    saveClientContent(next);
  }, []);

  const resetContent = useCallback(() => {
    resetClientContent();
    setContent(getDefaultContent());
  }, []);

  return (
    <ContentContext.Provider
      value={{ content, setContent, saveContent, resetContent, hydrated }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}
