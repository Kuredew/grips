export interface Field {
	name: string;
	value: string;
	callback?: () => void;
}

export interface Menu {
	name: string;
	field: Field[];
}

export type Menus = Menu[];
