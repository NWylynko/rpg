import React, { createContext, useState, useContext } from "react";
import { useInput } from "ink";
import { useWorld } from "./world";

interface PlayerStore {
	playerX: number;
	playerY: number;
	setUpdatePlayerLocation: React.Dispatch<React.SetStateAction<boolean>>;
	health: number;
	setHealth: React.Dispatch<React.SetStateAction<number>>;
}

const StoreContext = createContext<PlayerStore>({} as PlayerStore);

export const usePlayer = () => useContext(StoreContext);

interface PlayerStoreProviderProps {
	children: JSX.Element | JSX.Element[];
}

export function PlayerStoreProvider({
	children,
}: PlayerStoreProviderProps): JSX.Element {
	const { width, height } = useWorld();

	const [playerX, setPlayerX] = useState(14);
	const [playerY, setPlayerY] = useState(6);

	// toggle to false to not allow the player to be updated by arrow keys
	const [updatePlayerLocation, setUpdatePlayerLocation] = useState(true);

	const [health, setHealth] = useState(1);

	useInput((_, key) => {
		if (!updatePlayerLocation) {
			return;
		}

		if (key.leftArrow) {
			setPlayerX(Math.max(0, playerX - 1));
		} else if (key.rightArrow) {
			setPlayerX(Math.min(width - 8, playerX + 1));
		} else if (key.upArrow) {
			setPlayerY(Math.max(0, playerY - 1));
		} else if (key.downArrow) {
			setPlayerY(Math.min(height - 4, playerY + 1));
		}
	});

	const store: PlayerStore = {
		playerX,
		playerY,
		setUpdatePlayerLocation,
		health, setHealth
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
