import React from "react";
import { AssetProps } from "./assets";
import { ActivationBox } from "./assets/ActivationBox";
import { Campfire } from "./assets/Campfire";

export interface Stage {
	stage: string;
	missions: Mission[];
	assets: Asset[];
}

export interface Mission {
	dialogue: string;
}

export interface Asset extends AssetProps {
	onContact?: "nextMission" | "nextStage" | "backStage"
}

export const stages: Stage[] = [
	{
		stage: "welcome traveler",
		missions: [
			{
				dialogue: "Walk up to the campfire with you right arrow key",
			},
			{
				dialogue: "try not to get burnt by the fire, but keep going for an adventure"
			}
		],
		assets: [
			{
				children: <Campfire />,
				contactRadius: 10,
				x: 36,
				y: 7,
				id: "campfire_1",
				onContact: "nextMission"
			},
			{
				children: <ActivationBox />,
				contactRadius: 1,
				x: 52,
				y: 0,
				id: "activationBox_1",
				onContact: "nextStage"
			}
		],
	},
	{
		stage: "second stage",
		missions: [
			{
				dialogue: "hello, go back if you please"
			}
		],
		assets: [
			{
				children: <Campfire />,
				contactRadius: 10,
				x: 12,
				y: 9,
				id: "campfire_1",
				// onContact: "nextMission"
			},
			{
				children: <Campfire />,
				contactRadius: 10,
				x: 37,
				y: 1,
				id: "campfire_2",
				// onContact: "nextMission"
			},
			{
				children: <ActivationBox />,
				contactRadius: 1,
				x: 0,
				y: 0,
				id: "activationBox_1",
				onContact: "backStage"
			}
		]
	}
];
