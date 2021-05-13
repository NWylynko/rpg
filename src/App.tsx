// this is where the game really starts
// but in the future this will probably just
// be a bare component that just renders in
// scenes conditionally like a router

import React from "react";
import {
	Box,
	Text,
	// Transform
} from "ink";

// import { usePlayer } from "./stores/player";
import { useInterface } from "./stores/interface";
import { useWorld } from "./stores/world";
import { Stats } from "./Stats";
import { GameViewport } from "./GameViewport";
import {stages} from "./stages"

export const margin = 1;

export const App = () => {
	// const { playerX, playerY } = usePlayer();
	const { width, objects } = useWorld();
	const { showDev, dialogueIndex } = useInterface();

	return (
		<Box>
			<Box flexDirection="column" width={width + margin * 2}>
				{showDev && (
					<>
						{/* <Text>
							[{playerX}, {playerY}]
						</Text> */}
						<Text>{JSON.stringify(objects, null, 2)}</Text>
					</>
				)}

				<GameViewport />
				<Box justifyContent="center">
					<Text>{stages[0]?.missions[dialogueIndex]?.dialogue}</Text>
				</Box>
				<Stats />
			</Box>
		</Box>
	);
};
