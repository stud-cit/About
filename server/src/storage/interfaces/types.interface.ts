export interface FileInterface {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	size: number;
	destination: string;
	location: string;
	filename: string;
	path: string;
	buffer: Buffer;
}

export enum AllowedTypes {
	JPEG = 'image/jpeg',
	JPG = 'image/jpg',
	PNG = 'image/png',
}
