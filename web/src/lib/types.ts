export interface BaseMenu {
	name: string;
	value: string;
}

export interface CallbackMenu extends BaseMenu {
	type: 'callback';
	callback: () => void;
}

export interface LinkMenu extends BaseMenu {
	type: 'link';
	href: string;
}

export type Menu = CallbackMenu | LinkMenu;

export interface MenuTab {
	name: string;
	menuList: Menu[];
}

export type MediaType = 'auto' | 'audio';
export type Quality = 'best' | 'worst' | '1080p' | '720p' | '480p' | '360p' | string;
