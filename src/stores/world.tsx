import React, { createContext, useContext, useState, useEffect } from "react";
import pointDistance from "point-distance";
import { useInterface } from './interface';
import { stages, Stage } from "../stages";
interface WorldStore {
	width: number;
	height: number;
	objects: Object[];
	addObject: (object: Object) => void;
	removeObject: (id: string) => void;
	updateObjectLocation: (object: ObjectUpdate) => void;
	stage: Stage;
	nextStage: () => void;
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
	inContactWith?: [];
}

interface ObjectUpdate {
	id: string;
	x?: number;
	y?: number;
	contactRadius?: number;
}

export function WorldStoreProvider({
	children,
}: WorldStoreProviderProps): JSX.Element {

	const { resetDialogue } = useInterface();

	const width = 60;
	const height = 16;

	const [stageIndex, setStageIndex] = useState(0);

	const nextStage = () => {
		setStageIndex(s => s + 1);
		resetDialogue()
	}

	const [objects, setObjects] = useState<Object[]>([]);

	const addObject = (newObject: Object) => {
		setObjects((s) => [...s, newObject]);
	};

	const removeObject = (id: string) => {
		setObjects((s) => s.filter((object) => object.id !== id));
	};

	const updateObjectLocation = (object: ObjectUpdate) => {
		setObjects((s) => {
			const index = s.findIndex((obj) => obj.id === object.id);

			let selectedObject: Object;

			if (index === -1) {
				selectedObject = {} as Object;
			} else {
				selectedObject = s.splice(index, 1)[0] || ({} as Object);
			}

			selectedObject = {...selectedObject, ...object}

			s = [...s, selectedObject];

			return s;
		});
	};

	useEffect(() => {
		const objDistanceLooking = objects.filter((obj) => obj.contactRadius);
		objDistanceLooking.forEach(({ x, y, id, contactRadius }) => {
			const otherObjects = objects.filter((obj) => obj.id !== id);
			console.log(
				otherObjects.map((obj2) => {
					return (
						pointDistance([x, y], [obj2.x, obj2.y]) < (contactRadius || 10) && obj2.id
					);
				})
			);
		});
	}, [objects]);

	const store: WorldStore = {
		width,
		height,
		objects,
		addObject,
		removeObject,
		updateObjectLocation,
		stage: stages[stageIndex] || {} as Stage,
		nextStage
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
