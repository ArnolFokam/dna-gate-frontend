export interface IBiometricInfo {
    id?: any;
    tenant_id?: any;
    hasFacial?: boolean;
    hasVocal?: boolean;
}

export const defaultValue: Readonly<IBiometricInfo> = {
    id: '',
    tenant_id: '',
    hasFacial: false,
    hasVocal: false
}
