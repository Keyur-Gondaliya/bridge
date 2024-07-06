interface Chain {
  chainId: number;
  name: string;
  shortName: string;
  imagePath: string;
}

interface Chains {
  [key: string]: Chain;
}
export const chains: Chains = {
  "1": {
    chainId: 1,
    name: "ETHEREUM",
    shortName: "ETH",
    imagePath: "/images/eth-logo.svg",
  },
  "56": {
    chainId: 56,
    name: "BNB",
    shortName: "BNB",
    imagePath: "/images/bsc-logo.svg",
  },
  "137": {
    chainId: 137,
    name: "POLYGON",
    shortName: "MATIC",
    imagePath: "/images/polygon-logo.svg",
  },
  "250": {
    chainId: 250,
    name: "FANTOM",
    shortName: "FTM",
    imagePath: "/images/fantom-logo.svg",
  },
  "25": {
    chainId: 25,
    name: "CRONOS",
    shortName: "CRO",
    imagePath: "/images/cronos-logo.svg",
  },
  "108": {
    chainId: 108,
    name: "THUNDER_CORE",
    shortName: "TT",
    imagePath: "/images/thundercore-logo.svg",
  },
  "43114": {
    chainId: 43114,
    name: "AVALANCHE",
    shortName: "AVAX",
    imagePath: "/images/avalanche-logo.svg",
  },
  "321": {
    chainId: 321,
    name: "KUCOIN_CHAIN",
    shortName: "KCS",
    imagePath: "/images/kcc-logo.svg",
  },
  "42161": {
    chainId: 42161,
    name: "ARBITRUM",
    shortName: "ARB",
    imagePath: "/images/arbitrum-logo.svg",
  },
  "10": {
    chainId: 10,
    name: "OPTIMISM",
    shortName: "OP",
    imagePath: "/images/optimism-logo.svg",
  },
  "592": {
    chainId: 592,
    name: "ASTAR",
    shortName: "ASTR",
    imagePath: "/images/astar-logo.svg",
  },
  "1285": {
    chainId: 1285,
    name: "MOONRIVER",
    shortName: "MOVR",
    imagePath: "/images/moonriver-logo.svg",
  },
  "8217": {
    chainId: 8217,
    name: "KLAYTN",
    shortName: "KLAY",
    imagePath: "/images/klaytn-logo.svg",
  },
  "1111": {
    chainId: 1111,
    name: "WEMIX",
    shortName: "WEMIX",
    imagePath: "/images/wemix-logo.jpeg",
  },
  "324": {
    chainId: 324,
    name: "ZKSYNC",
    shortName: "ZKSYNC",
    imagePath: "/images/zksync-logo.svg",
  },
  "1101": {
    chainId: 1101,
    name: "ZKEVM",
    shortName: "ZKEVM",
    imagePath: "/images/polygon-zkevm-logo.svg",
  },
  "59144": {
    chainId: 59144,
    name: "LINEA",
    shortName: "LINEA",
    imagePath: "/images/linea-logo.svg",
  },
  "8453": {
    chainId: 8453,
    name: "BASE",
    shortName: "BASE",
    imagePath: "/images/base-logo.svg",
  },
  "5000": {
    chainId: 5000,
    name: "MANTLE",
    shortName: "MNT",
    imagePath: "/images/mantle-logo.svg",
  },
  "10507": {
    chainId: 10507,
    name: "NUMBERS",
    shortName: "NUM",
    imagePath: "/images/numbers-logo.svg",
  },
  "534352": {
    chainId: 534352,
    name: "SCROLL",
    shortName: "SCROLL",
    imagePath: "/images/scroll-logo.svg",
  },
  "81457": {
    chainId: 81457,
    name: "BLAST",
    shortName: "BLAST",
    imagePath: "/images/blast-logo.svg",
  },
  "196": {
    chainId: 196,
    name: "X_LAYER",
    shortName: "XLAYER",
    imagePath: "/images/x-layer-logo.svg",
  },
  "167000": {
    chainId: 167000,
    name: "TAIKO",
    shortName: "TAIKO",
    imagePath: "/images/taiko-logo.svg",
  },
  "6699": {
    chainId: 6699,
    name: "OX",
    shortName: "OX",
    imagePath: "/images/ox-chain-logo.svg",
  },
};
