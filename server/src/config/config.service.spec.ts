import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

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

	it('should be return boolean value', () => {
		expect(configService.get('PASSPORT_SESSION')).toBe(true);
	});

	it('should be return number value', () => {
		expect(configService.get('PORT')).toBe(8081);
	});

	it('should be return string value', () => {
		expect(configService.get('API_PREFFIX')).toBe('/api');
	});

	it('should be return type error', () => {
		expect(() => configService.get('ANYKEY')).toThrow(TypeError);
	});
});
