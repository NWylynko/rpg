import React from "react";
import { AssetProps } from "./assets";
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
	onContact: "nextMission" | "nextStage"
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
		],
	},
];
