import type { InjectionKey } from 'vue';

export type ValidatorModule = () => Promise<boolean> | undefined;
export const ValidatorModuleKey: InjectionKey<ValidatorModule> = Symbol('validatorModule');
