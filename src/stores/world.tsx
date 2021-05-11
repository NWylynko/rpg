import React, { createContext, useContext, useState, useEffect } from "react";
import pointDistance from "point-distance";

interface WorldStore {
	width: number;
	height: number;
	objects: Object[];
	addObject: (object: Object) => void;
	removeObject: (id: string) => void;
	updateObjectLocation: (object: ObjectUpdate) => void;
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
	const width = 60;
	const height = 16;

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

			if (object.id) {
				selectedObject.id = object.id;
			}
			if (object.x) {
				selectedObject.x = object.x;
			}
			if (object.y) {
				selectedObject.y = object.y;
			}
			if (object.contactRadius) {
				selectedObject.contactRadius = object.contactRadius;
			}

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
	};

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
}
