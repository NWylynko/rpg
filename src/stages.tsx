import React from "react"
import { AssetProps } from './assets';
import { Campfire } from "./assets/Campfire";

export interface Stage {
  stage: string;
  missions: {
    dialogue: string
  }[];
  assets: AssetProps[];
}

export const stages: Stage[] = [
	{
		stage: "welcome traveler",
		missions: [
			{
				dialogue: "Walk up to the campfire with you right arrow key",
			},
		],
		assets: [
			{
				children: <Campfire />,
				contactRadius: 10,
				x: 36,
				y: 7,
				id: "campfire_1"
			},
		],
	},
];
