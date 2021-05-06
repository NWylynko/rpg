// this is where the game really starts
// but in the future this will probably just
// be a bare component that just renders in
// scenes conditionally like a router

import React from "react";
import { 
	useInput,
	 useApp, 
	 Box, 
	 Text,
		// Transform 
	} from "ink";
import ProgressBar from "./components/ProgressBar";

import { Asset } from "./assets";
import { Campfire } from "./assets/Campfire";

import { usePlayer } from "./stores/player";
import { useInterface } from "./stores/interface";
import { useWorld } from "./stores/world";

const margin = 2;

export const App = () => {
	const { playerX, playerY } = usePlayer();
	const { width } = useWorld();
	const { showingInventory, showDev } = useInterface();

	return (
		<Box>
			<Box flexDirection="column" width={width + margin * 2}>
				{showDev && (
					<Text>
						[{playerX}, {playerY}]
					</Text>
				)}

				{showingInventory ? <Inventory /> : <GameViewport />}
				<Stats />
			</Box>
		</Box>
	);
};

export const Colors = () => {
	return (
		<Box flexDirection="column">
			<Text color="black">black █</Text>
			<Text color="blackBright">blackBright █</Text>
			<Text color="blue">blue █</Text>
			<Text color="blueBright">blueBright █</Text>
			<Text color="cyan">cyan █</Text>
			<Text color="cyanBright">cyanBright █</Text>
			<Text color="gray">gray █</Text>
			<Text color="green">green █</Text>
			<Text color="greenBright">greenBright █</Text>
			<Text color="grey">grey █</Text>
			<Text color="magenta">magenta █</Text>
			<Text color="magentaBright">magentaBright █</Text>
			<Text color="red">red █</Text>
			<Text color="redBright">redBright █</Text>
			<Text color="white">white █</Text>
			<Text color="whiteBright">whiteBright █</Text>
			<Text color="yellow">yellow █</Text>
			<Text color="yellowBright">yellowBright █</Text>
		</Box>
	);
};

const GameViewport = () => {
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
			<Box paddingLeft={playerX} paddingTop={playerY} flexDirection="column">
				<Text color="red"> (.)</Text>
				<Text color="red">\-|-/</Text>
				<Text color="red"> / \</Text>
			</Box>

			<Asset x={5} y={4}>
				<Campfire />
			</Asset>

			<Asset x={13} y={7}>
				<Campfire />
			</Asset>

			<Asset x={35} y={9}>
				<Campfire />
			</Asset>

			<Asset x={41} y={4}>
				<Campfire />
			</Asset>
		</Box>
	);
};

export const Inventory = () => {
	const { height } = useWorld();

	return (
		<Box
			borderColor="white"
			borderStyle="round"
			flexDirection="column"
			margin={margin}
			height={height + margin * 2}
		>
	{[...Array(3).keys()].map((n) => (
		<Box flexDirection="row" key={`inventory_row-${n}`} justifyContent="center">
			{[...Array(5).keys()].map((n) => (
				<Box
					key={`inventory_item-${n}`}
					borderColor="white"
					borderStyle="round"
					margin={0}
					height={4}
					width={8}
					justifyContent="center"
					alignItems="center"
					flexDirection="column"
				>
					{/* <Box flexDirection="column"> */}
						{/* <Transform transform={(output) => output + " "}>
						</Transform> */}
						<Text color="red">⛏</Text>

						{/* <Text>T</Text> */}
						<Text>    T</Text>
						{/* <Text> 5</Text> */}
					{/* </Box> */}
				</Box>
			))}
		</Box>
	))}
		</Box>
	);
};

export const Stats = () => {
	return (
		<Box flexDirection="row" justifyContent="space-around">
			<Box borderColor="white" borderStyle="round" width={30 + 8}>
				<Text>Health: </Text>
				<ProgressBar percent={0.5} width={30} color="red" />
			</Box>
			{/* <Box borderColor="white" borderStyle="round" width={30 + 9}>
				<Text>Stamina: </Text>
				<ProgressBar percent={0.75} width={30} color="red" />
			</Box> */}
		</Box>
	);
};

			

