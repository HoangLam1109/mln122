import { CorporateDataMap } from "../types";

export const corporateData: CorporateDataMap = {
  beverage: {
    title: "Ngành Nước giải khát (Beverage)",
    companies: [
      {
        id: "coca",
        name: "Coca-Cola Company (KO)",
        marketCap: "$265B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.4%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.2%" },
          { shareholder: "Berkshire Hathaway (Warren Buffett)", percentage: "9.2%" },
          { shareholder: "State Street Corporation", percentage: "3.9%" }
        ]
      },
      {
        id: "pepsi",
        name: "PepsiCo, Inc. (PEP)",
        marketCap: "$235B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "9.1%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.8%" },
          { shareholder: "State Street Corporation", percentage: "4.2%" },
          { shareholder: "Geode Capital Management", percentage: "2.1%" }
        ]
      }
    ]
  },
  tech: {
    title: "Ngành Công nghệ (Big Tech)",
    companies: [
      {
        id: "apple",
        name: "Apple Inc. (AAPL)",
        marketCap: "$3.2T",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.3%" },
          { shareholder: "BlackRock, Inc.", percentage: "6.6%" },
          { shareholder: "Berkshire Hathaway", percentage: "5.8%" },
          { shareholder: "State Street Corporation", percentage: "3.7%" }
        ]
      },
      {
        id: "microsoft",
        name: "Microsoft Corp. (MSFT)",
        marketCap: "$3.1T",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.9%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.3%" },
          { shareholder: "State Street Corporation", percentage: "3.9%" },
          { shareholder: "FMR LLC (Fidelity)", percentage: "2.8%" }
        ]
      }
    ]
  },
  energy: {
    title: "Ngành Năng lượng (Energy)",
    companies: [
      {
        id: "exxon",
        name: "ExxonMobil (XOM)",
        marketCap: "$480B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "9.4%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.1%" },
          { shareholder: "State Street Corporation", percentage: "4.8%" },
          { shareholder: "FMR LLC (Fidelity)", percentage: "2.2%" }
        ]
      },
      {
        id: "chevron",
        name: "Chevron Corp. (CVX)",
        marketCap: "$290B",
        shares: [
          { shareholder: "The Vanguard Group", percentage: "8.8%" },
          { shareholder: "BlackRock, Inc.", percentage: "7.5%" },
          { shareholder: "Berkshire Hathaway", percentage: "6.1%" },
          { shareholder: "State Street Corporation", percentage: "3.7%" }
        ]
      }
    ]
  }
};
