import React, { createContext, useContext, useState } from "react";
import pointDistance from "point-distance";
import { stages, Stage, Mission } from "../stages";
interface WorldStore {
	width: number;
	height: number;
	objects: Object[];
	addObject: (object: Object) => void;
	removeObject: (id: string) => void;
	updateObjectLocation: (object: Object) => void;
	stage: Stage;
	nextStage: () => void;
	mission: Mission;
	nextMission: () => void;
}

const StoreContext = createContext<WorldStore>({} as WorldStore);

export const useWorld = () => useContext(StoreContext);

interface WorldStoreProviderProps {
	children: JSX.Element | JSX.Element[];
}

interface Object {
	id: string;
	x: number;
	y: number;
	contactRadius?: number;
	inContactWith?: (string | false)[];
}

export function WorldStoreProvider({
	children,
}: WorldStoreProviderProps): JSX.Element {

	const width = 60;
	const height = 16;

	const [stageIndex, setStageIndex] = useState(0);
	const [missionIndex, setMissionIndex] = useState(0);

	const nextStage = () => {
		setStageIndex((s) => s + 1);
	};

	const backStage = () => {
		setStageIndex((s) => s - 1);
	}

	const nextMission = () => {
		setMissionIndex((s) => s + 1);
	}

	const [objects, setObjects] = useState<Object[]>([]);

	const addObject = (newObject: Object) => {
		setObjects((s) => [...s, newObject]);
	};

	const removeObject = (id: string) => {
		setObjects((s) => s.filter((object) => object.id !== id));
	};

	const updateObjectLocation = (object: Object) => {
		setObjects((s) => {
			const index = s.findIndex((obj) => obj.id === object.id);

			let selectedObject: Object;

			if (index === -1) {
				selectedObject = {} as Object;
			} else {
				selectedObject = s.splice(index, 1)[0] || ({} as Object);
			}

			object.inContactWith = updateObjectsInRadius(object);

			object.inContactWith.map((id) => {
				if (typeof id === "string") {
					const asset = stage.assets.find((asset) => asset.id === id)
					const { onContact } = asset || {};
					if (onContact) {
						const func = {
							"nextMission": nextMission,
							"nextStage": nextStage,
							"backStage": backStage
						}
						func[onContact]()
					}
				}
			})

			selectedObject = { ...selectedObject, ...object };

			s = [...s, selectedObject];

			return s;
		});
	};

	const updateObjectsInRadius = ({
		x,
		y,
		id,
		contactRadius,
	}: Object): (string | false)[] => {
		const otherObjects = objects.filter((obj) => obj.id !== id);

		const inContactWith = otherObjects
			.map((obj2) => {
				return (
					pointDistance([x, y], [obj2.x, obj2.y]) < (contactRadius || 10) &&
					obj2.id
				);
			}).filter((obj) => obj !== false);

		return inContactWith;
	};
 
	const stage: Stage = stages[stageIndex] || ({} as Stage);

	const store: WorldStore = {
		width,
		height,
		objects,
		addObject,
		removeObject,
		updateObjectLocation,
		nextStage,
		stage,
		mission: stage.missions[missionIndex] || ({} as Mission),
		nextMission
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
