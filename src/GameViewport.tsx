import React from "react";
import { useInput, useApp, Box } from "ink";
import { Asset } from "./assets";
import { Player } from "./assets/Player";
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
	const { height, stage } = useWorld();

	return (
		<Box
			flexDirection="column"
			margin={margin}
			height={height + margin * 2}
			// borderColor="white"
			// borderStyle="round"
		>
			{stage.assets.map((props) => (
				<Asset {...props} key={props.id}/>
			))}

			<Asset x={playerX} y={playerY} id="player">
				<Player />
			</Asset>
		</Box>
	);
}
