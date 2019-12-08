import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

process.env = {
	...process.env,
	MOK_BOOLEAN: 'false',
	MOK_NUMBER: '123456',
	MOK_STRING: 'string',
	MOC_DEST: '/test/dest',
};

describe('ConfigService', () => {
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ConfigService],
		}).compile();

		configService = module.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(configService).toBeDefined();
	});

	describe('getDest', () => {
		it('should be return destination', () => {
			expect(configService.getDest('MOC_DEST')).toBe(
				'/home/helsis/Documents/About/server/test/dest',
			);
		});

		it('should be return type error', () => {
			expect(() => configService.getDest('MOK_TYPEERROR')).toThrow(TypeError);
		});
	});

	describe('getMode', () => {
		it('should be return boolean value', () => {
			expect(configService.getMode('test')).toBe(true);
		});
	});

	describe('get', () => {
		it('should be return boolean value', () => {
			expect(configService.get('MOK_BOOLEAN')).toBe(false);
		});

		it('should be return number value', () => {
			expect(configService.get('MOK_NUMBER')).toBe(123456);
		});

		it('should be return string value', () => {
			expect(configService.get('MOK_STRING')).toBe('string');
		});

		it('should be return type error', () => {
			expect(() => configService.get('MOK_TYPEERROR')).toThrow(TypeError);
		});
	});
});
