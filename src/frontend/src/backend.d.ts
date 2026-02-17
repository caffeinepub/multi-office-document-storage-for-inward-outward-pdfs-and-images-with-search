import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: string;
    name: string;
    offices: Array<Office>;
}
export interface Office {
    id: string;
    name: string;
}
export type Time = bigint;
export interface PublicDocument {
    id: string;
    categoryId: string;
    documentDate: Time;
    title: string;
    direction: Direction;
    referenceNumber?: string;
    mimeType: string;
    fileSize: bigint;
    uploadTimestamp: Time;
    filename: string;
    blobId: string;
    uploader: Principal;
    officeId: string;
}
export interface UserAccount {
    username: string;
    role: UserRole;
    passwordHash: string;
}
export interface DashboardMetrics {
    outwardDocuments: bigint;
    inwardDocuments: bigint;
    importantDocuments: bigint;
    uniqueUserCount: bigint;
    totalDocuments: bigint;
}
export interface UserProfile {
    name: string;
}
export enum Direction {
    importantDocuments = "importantDocuments",
    inward = "inward",
    outward = "outward"
}
export enum UserRole {
    supervisor = "supervisor",
    admin = "admin"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCategory(id: string, name: string): Promise<void>;
    addDocument(id: string, categoryId: string, officeId: string, direction: Direction, title: string, referenceNumber: string | null, documentDate: Time, filename: string, mimeType: string, fileSize: bigint, blobId: string): Promise<void>;
    addOfficeToCategory(categoryId: string, officeId: string, officeName: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    authenticate(username: string, passwordHash: string): Promise<boolean>;
    createUser(username: string, passwordHash: string, role: UserRole): Promise<void>;
    deleteUser(username: string): Promise<void>;
    filterDocuments(categoryId: string | null, officeId: string | null, direction: Direction | null, startDate: Time | null, endDate: Time | null, _dummy: boolean | null): Promise<Array<PublicDocument>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getCategories(): Promise<Array<Category>>;
    getDashboardMetrics(): Promise<DashboardMetrics>;
    getDocument(id: string): Promise<PublicDocument>;
    getUser(username: string): Promise<UserAccount | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listUsers(): Promise<Array<UserAccount>>;
    removeCategory(id: string): Promise<void>;
    removeDocument(id: string): Promise<void>;
    removeOfficeFromCategory(categoryId: string, officeId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCategory(id: string, newName: string): Promise<void>;
    updateOfficeInCategory(categoryId: string, officeId: string, newOfficeName: string): Promise<void>;
    updateUser(username: string, newPasswordHash: string | null, newRole: UserRole | null): Promise<void>;
}
