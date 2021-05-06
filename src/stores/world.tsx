import React, { createContext, useContext } from "react";

interface WorldStore {
  width: number;
  height: number;
}

const StoreContext = createContext<WorldStore>({} as WorldStore);

export const useWorld = () => useContext(StoreContext);

interface WorldStoreProviderProps {
	children: JSX.Element | JSX.Element[];
}

export function WorldStoreProvider({
	children,
}: WorldStoreProviderProps): JSX.Element {
	const width = 60;
  const height = 16;

	const store: WorldStore = {
		width,
		height,
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
