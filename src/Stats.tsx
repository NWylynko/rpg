import React from "react";
import {
	Box,
	Text
} from "ink";
import ProgressBar from "./components/ProgressBar";
import { usePlayer } from "./stores/player";


export function Stats() {

	const { health } = usePlayer();

	return (
		<Box flexDirection="row" justifyContent="space-around">
			<Box borderColor="white" borderStyle="round" width={30 + 10}>
				<Text>Health: </Text>
				<ProgressBar percent={health} width={30} color="red" />
			</Box>
		</Box>
	);
}
