import React, { createContext, useState, useContext } from "react";
import { useInput } from "ink";
import { usePlayer } from "./player"

interface InterfaceStore {
	showingInventory: boolean;
	toggleInventory: () => void;
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

	const { setUpdatePlayerLocation } = usePlayer();

	const [showingInventory, setShowingInventory] = useState(false);
	const [showDev, setShowDev] = useState(false);

	const toggleInventory = () => {
		setShowingInventory(s => {
			setUpdatePlayerLocation(s);
			return !s;
		})
	}

	const toggleDev = () => {
		setShowDev(s => !s)
	}

	useInput((input) => {
		if (input === "i") {
			toggleInventory();
		} else if (input === ".") {
			toggleDev();
		}
	});

	const store: InterfaceStore = {
		showingInventory,
		toggleInventory,
		showDev
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
