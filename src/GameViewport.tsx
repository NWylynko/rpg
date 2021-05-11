import React from "react";
import {
	useInput,
	useApp,
	Box,
	Text
} from "ink";
import { Asset } from "./assets";
import { Campfire } from "./assets/Campfire";
import { usePlayer } from "./stores/player";
import { useWorld } from "./stores/world";
import { margin } from "./App";

export function GameViewport() {
	const { exit } = useApp();

	useInput((input) => {
		if (input === "q") {
			exit();
		}
	});

	const { playerX, playerY } = usePlayer();
	const { height } = useWorld();

	return (
		<Box
			flexDirection="column"
			margin={margin}
			height={height + margin * 2}
			borderColor="white"
			borderStyle="round"
		>
			<Asset x={playerX} y={playerY} id="player">
				<Text color="red"> _ _</Text>
				<Text color="red"> °-°</Text>
				<Text color="red">🗡️-|-🗡️</Text>
				<Text color="red"> / \</Text>
			</Asset>


			<Asset x={36} y={7} id="campfire_1" contactRadius={10}>
				<Campfire />
			</Asset>
		</Box>
	);
}
