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

export type MediaType = 'auto' | 'audio';
export type Quality = 'best' | 'worst' | '1080p' | '720p' | '480p' | '360p' | string;
