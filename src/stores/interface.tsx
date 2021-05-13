import React, { createContext, useState, useContext } from "react";
import { useInput } from "ink";

interface InterfaceStore {
	showDev: boolean;
	dialogueIndex: number;
	nextDialogue: () => void;
	resetDialogue: () => void;
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

	const [dialogueIndex, setDialogueIndex] = useState(0);

	const nextDialogue = () => {
		setDialogueIndex(s => s + 1) 
	}

	const resetDialogue = () => {
		setDialogueIndex(0)
	}

	const store: InterfaceStore = {
		showDev,
		dialogueIndex,
		nextDialogue,
		resetDialogue
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
