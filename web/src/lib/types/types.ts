export interface VideoFormat {
	format_id: string;
	ext: string;
	resolution: string;
	filesize: string;
	vcodec: string;
	acodec: string;
	note: string;
}

export interface VideoInfo {
	id: string;
	title: string;
	description: string;
	duration: number;
	thumbnail: string;
	uploader: string;
	view_count: string;
	formats: VideoFormat[];
}

export interface DoneEventData {
	file_url: string;
	file_name: string;
	file_size: number;
}

export interface ProgressEventData {
	log: string;
	error: boolean;
	done: boolean;
}

export interface ErrorEventData {
	message: string;
}

export type EventData = DoneEventData | ProgressEventData | ErrorEventData;

export interface StreamEvent {
	event: string;
	data: EventData;
}

export type MediaType = 'video' | 'audio';

export type StatusQueue = 'processing' | 'completed' | 'failed';

export interface Queue {
	id: string;
	status: StatusQueue;
	percent: number;
	log: string[];
	file_url: string | null;
}
