"use client";
import {
  DEFAULT_FROM_BLOCKCHAIN_ID,
  DEFAULT_FROM_TOKEN,
  DEFAULT_TO_BLOCKCHAIN_ID,
  DEFAULT_TO_TOKEN,
} from "@/constants/defaultValues";
import { chains } from "@/constants/imageList";
import React, { createContext, useState, ReactNode } from "react";

export interface Blockchain {
  chainId: string;
  logo: string;
  name: string;
}

export interface Token {
  address: string;
  decimals: number;
  logo: string;
  name: string;
}

interface Chain {
  blockchain: Blockchain;
  token: Token;
}

export interface CurrentChains {
  from: Chain;
  to: Chain;
  amount: number;
}

export interface ChainContextProps {
  currentChains: CurrentChains;
  setCurrentChains: (value: CurrentChains) => void;
}

export const ChainContext = createContext<ChainContextProps | undefined>(
  undefined
);

export const ChainContextProvider = ({ children }: { children: ReactNode }) => {
  const from = chains[DEFAULT_FROM_BLOCKCHAIN_ID],
    to = chains[DEFAULT_TO_BLOCKCHAIN_ID];
  const [currentChains, setCurrentChains] = useState<CurrentChains>({
    from: {
      blockchain: {
        chainId: from.chainId.toString(),
        logo: from.imagePath,
        name: from.name,
      },
      token: {
        address: DEFAULT_FROM_TOKEN.address,
        decimals: DEFAULT_FROM_TOKEN.decimals,
        logo: DEFAULT_FROM_TOKEN.logoURI,
        name: DEFAULT_FROM_TOKEN.name,
      },
    },
    to: {
      blockchain: {
        chainId: to.chainId.toString(),
        logo: to.imagePath,
        name: to.name,
      },
      token: {
        address: DEFAULT_TO_TOKEN.address,
        decimals: DEFAULT_TO_TOKEN.decimals,
        logo: DEFAULT_TO_TOKEN.logoURI,
        name: DEFAULT_TO_TOKEN.name,
      },
    },
    amount: 0,
  });

  return (
    <ChainContext.Provider value={{ currentChains, setCurrentChains }}>
      {children}
    </ChainContext.Provider>
  );
};
