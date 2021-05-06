import React, { createContext, useState, useContext } from "react";
import { useInput } from "ink";
import { useWorld } from "./world"

interface PlayerStore {
  playerX: number;
	playerY: number;
	setUpdatePlayerLocation: React.Dispatch<React.SetStateAction<boolean>>;
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

	const [playerX, setPlayerX] = useState(Math.floor((width - 7) / 2));
	const [playerY, setPlayerY] = useState(height / 2);
	
	// toggle to false to not allow the player to be updated by arrow keys
	const [updatePlayerLocation, setUpdatePlayerLocation] = useState(true);
  
  useInput((_, key) => {

		if (!updatePlayerLocation) {
			return;
		}

		if (key.leftArrow) {
			setPlayerX(Math.max(0, playerX - 1));
		} else if (key.rightArrow) {
			setPlayerX(Math.min(width - 7, playerX + 1));
		} else if (key.upArrow) {
			setPlayerY(Math.max(0, playerY - 1));
		} else if (key.downArrow) {
			setPlayerY(Math.min(height - 1, playerY + 1));
		}
	});

	const store: PlayerStore = {
		playerX,
		playerY,
		setUpdatePlayerLocation
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
