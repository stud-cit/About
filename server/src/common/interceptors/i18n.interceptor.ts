import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * [I18nInterceptor description]
 * @return [description]
 */
@Injectable()
export class I18nInterceptor implements NestInterceptor {
	/**
	 * [intercept description]
	 * @param  context [description]
	 * @param  next    [description]
	 * @return         [description]
	 */
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map(data =>
				data.reduce((agg, item) => {
					const group = item.lang;
					agg[group] = [...(agg[group] || []), item];
					return agg;
				}, {}),
			),
		);
	}
}
