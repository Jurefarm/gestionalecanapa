import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Lot, StageBatch, SubLot, NewSubLotInput, FinishedProduct, Company, Variety, User } from '../types';

interface GestionaleContextType {
  lots: Lot[];
  stageBatches: StageBatch[];
  subLots: SubLot[];
  companies: Company[];
  varieties: Variety[];
  finishedProducts: FinishedProduct[];
  users: User[];

  addLot: (lot: Lot) => void;
  addStageBatch: (batch: StageBatch) => void;
  createSubLot: (input: NewSubLotInput) => string;
  getSubLotsForLot: (lotId: string) => SubLot[];
  addCompany: (company: Company) => void;
  addVariety: (variety: Variety) => void;
  addFinishedProduct: (product: FinishedProduct) => void;
  addUser: (user: User) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  updateVariety: (id: string, updates: Partial<Variety>) => void;
  deleteCompany: (id: string) => void;
  deleteVariety: (id: string) => void;
}

const GestionaleContext = createContext<GestionaleContextType | undefined>(undefined);

export const GestionaleProvider = ({ children }: { children: ReactNode }) => {
  const [lots, setLots] = useState<Lot[]>([]);
  const [stageBatches, setStageBatches] = useState<StageBatch[]>([]);
  const [subLots, setSubLots] = useState<SubLot[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [finishedProducts, setFinishedProducts] = useState<FinishedProduct[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('hempGestionaleStateV2');
    const savedMaster = localStorage.getItem('hempGestionaleMasterV1');

    if (saved) {
      try {
        const state = JSON.parse(saved);
        setLots(state.lots || []);
        setStageBatches(state.stageBatches || []);
        setSubLots(state.subLots || []);
      } catch (e) {
        console.error('Failed to parse state:', e);
      }
    }

    if (savedMaster) {
      try {
        const master = JSON.parse(savedMaster);
        setCompanies(master.companies || []);
        setVarieties(master.varieties || []);
        setFinishedProducts(master.finishedProducts || []);
        setUsers(master.users || []);
      } catch (e) {
        console.error('Failed to parse master:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'hempGestionaleStateV2',
      JSON.stringify({ lots, stageBatches, subLots })
    );
  }, [lots, stageBatches, subLots]);

  useEffect(() => {
    localStorage.setItem(
      'hempGestionaleMasterV1',
      JSON.stringify({ companies, varieties, finishedProducts, users })
    );
  }, [companies, varieties, finishedProducts, users]);

  const addLot = (lot: Lot) => setLots([...lots, lot]);

  const addStageBatch = (batch: StageBatch) => setStageBatches([...stageBatches, batch]);

  const createSubLot = (input: NewSubLotInput) => {
    const id = `sublot-${Date.now()}`;
    const subLot: SubLot = {
      ...input,
      id,
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    setSubLots([...subLots, subLot]);
    return id;
  };

  const getSubLotsForLot = (parentLotId: string) =>
    subLots.filter((sl) => sl.parentLotId === parentLotId);

  const addCompany = (company: Company) => setCompanies([...companies, company]);

  const addVariety = (variety: Variety) => setVarieties([...varieties, variety]);

  const addFinishedProduct = (product: FinishedProduct) =>
    setFinishedProducts([...finishedProducts, product]);

  const addUser = (user: User) => setUsers([...users, user]);

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(companies.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const updateVariety = (id: string, updates: Partial<Variety>) => {
    setVarieties(varieties.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const deleteCompany = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  const deleteVariety = (id: string) => {
    setVarieties(varieties.filter((v) => v.id !== id));
  };

  return (
    <GestionaleContext.Provider
      value={{
        lots,
        stageBatches,
        subLots,
        companies,
        varieties,
        finishedProducts,
        users,
        addLot,
        addStageBatch,
        createSubLot,
        getSubLotsForLot,
        addCompany,
        addVariety,
        addFinishedProduct,
        addUser,
        updateCompany,
        updateVariety,
        deleteCompany,
        deleteVariety,
      }}
    >
      {children}
    </GestionaleContext.Provider>
  );
};

export const useGestionale = () => {
  const context = useContext(GestionaleContext);
  if (!context) {
    throw new Error('useGestionale must be used within GestionaleProvider');
  }
  return context;
};
