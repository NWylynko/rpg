import React, { createContext, useState, useContext } from "react";
import { useInput } from "ink";

interface InterfaceStore {
	showDev: boolean;
}

const StoreContext = createContext<InterfaceStore>({} as InterfaceStore);

export const useInterface = () => useContext(StoreContext);

interface InterfaceStoreProviderProps {
	children: JSX.Element | JSX.Element[];
}

export function InterfaceStoreProvider({
	children,
}: InterfaceStoreProviderProps): JSX.Element {

	const [showDev, setShowDev] = useState(false);

	const toggleDev = () => {
		setShowDev(s => !s)
	}

	useInput((input) => {
		if (input === ".") {
			toggleDev();
		}
	});

	const store: InterfaceStore = {
		showDev
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
