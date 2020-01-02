import { Getters, Mutations, Actions, Module } from 'vuex-smart-module';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Store } from 'vuex';
import Vue from 'vue';

class StorageState {
	error!: any;
	storage!: string;
}

class StorageGetters extends Getters<StorageState> {
	public get getError(): any {
		return this.state.error;
	}

	public get getStorage(): string {
		return this.state.storage;
	}
}

class StorageMutations extends Mutations<StorageState> {
	public setError(data: any) {
		return Vue.set(this.state, 'error', data);
	}

	public setStorage(data: string) {
		return Vue.set(this.state, 'storage', data);
	}
}

export class StorageActions extends Actions<
	StorageState,
	StorageGetters,
	StorageMutations,
	StorageActions
> {
	private store!: Store<NuxtAxiosInstance> | any;

	public $init(store: Store<NuxtAxiosInstance>): void {
		this.store = store;
	}

	async createStore(data: any): Promise<void> {
		const headers = { 'Content-Type': 'multipart/form-data' };
		return await this.store.$axios
			.$post(`storage`, data, { headers })
			.then(this.mutations.setStorage)
			.catch(this.mutations.setError);
	}
}

export const StorageModule = new Module({
	state: StorageState,
	getters: StorageGetters,
	mutations: StorageMutations,
	actions: StorageActions,
});
