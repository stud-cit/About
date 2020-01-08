import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	Repository,
	DeepPartial,
	DeleteResult,
	FindOneOptions,
	FindManyOptions,
} from 'typeorm';
import {
	MulterModuleOptions,
	MulterOptionsFactory,
} from '@nestjs/platform-express';

import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

import { ConfigService } from '../config';

import { StorageEntity } from './storage.entity';

/**
 * [StorageService description]
 */
@Injectable()
export class StorageService implements MulterOptionsFactory {
	/**
	 * [constructor description]
	 * @param @InjectRepository(StorageEntity [description]
	 * @param configService [description]
	 */
	constructor(
		@InjectRepository(StorageEntity)
		private readonly storageRepository: Repository<StorageEntity>,
		private readonly configService: ConfigService,
	) {}

	/**
	 * [createOne description]
	 * @param  data [description]
	 * @return      [description]
	 */
	public async createOne(
		data: DeepPartial<StorageEntity>,
	): Promise<StorageEntity> {
		return await this.storageRepository.save(data).catch(() => {
			throw new ConflictException(`Resource already exists`);
		});
	}

	/**
	 * [selectAll description]
	 * @param  where [description]
	 * @return       [description]
	 */
	public async selectAll(
		where: FindManyOptions['where'],
	): Promise<StorageEntity[]> {
		return await this.storageRepository.find({ where }).catch(() => {
			throw new NotFoundException('Resource not found');
		});
	}

	/**
	 * [selectOne description]
	 * @param  where [description]
	 * @return       [description]
	 */
	public async selectOne(
		where: FindOneOptions['where'],
	): Promise<StorageEntity> {
		return await this.storageRepository.findOneOrFail({ where }).catch(() => {
			throw new NotFoundException('Resource not found');
		});
	}

	/**
	 * [updateOne description]
	 * @param  data  [description]
	 * @param  _data [description]
	 * @return       [description]
	 */
	public async updateOne(
		data: StorageEntity,
		_data: DeepPartial<StorageEntity>,
	): Promise<StorageEntity> {
		if (!data) data = new StorageEntity();
		const temp = this.storageRepository.merge(data, _data);
		return await this.storageRepository.save(temp).catch(() => {
			throw new NotFoundException('Resource not found');
		});
	}

	/**
	 * [deleteOne description]
	 * @param  id [description]
	 * @return    [description]
	 */
	public async deleteOne(id: StorageEntity['id']): Promise<DeleteResult> {
		return await this.storageRepository.delete(id).catch(() => {
			throw new NotFoundException('Resource not found');
		});
	}

	/**
	 * [createMulterOptions description]
	 * @return [description]
	 */
	public createMulterOptions(): MulterModuleOptions {
		const allowedTypes = this.configService.get('STORE_MIME_TYPE');
		const fileSize = this.configService.get('STORE_FILE_SIZE') * 1024 ** 2;
		const destination = this.configService.getDest('STORE_DEST');

		const filename = (
			_req: Express.Request,
			file: Express.Multer.File,
			cb: Function,
		) => {
			return cb(null, join(v4()) + extname(file.originalname));
		};

		const fileFilter = (
			_req: Express.Request,
			file: Express.Multer.File,
			cb: Function,
		) => {
			if (allowedTypes.includes(file.mimetype)) return cb(null, true);
			return cb(new UnsupportedMediaTypeException(), false);
		};

		return {
			fileFilter,
			limits: { fileSize },
			storage: diskStorage({ destination, filename }),
		};
	}
}
