import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Office = {
    __kind__: "pharmacyCollege";
    pharmacyCollege: GenericOffice;
} | {
    __kind__: "ayurvedCollege";
    ayurvedCollege: GenericOffice;
} | {
    __kind__: "ayurvedHospital";
    ayurvedHospital: GenericOffice;
} | {
    __kind__: "paramedicalInstitute";
    paramedicalInstitute: GenericOffice;
} | {
    __kind__: "generalCorrespondence";
    generalCorrespondence: GenericOffice;
} | {
    __kind__: "socialMediaEvents";
    socialMediaEvents: GenericOffice;
} | {
    __kind__: "nursingInstitute";
    nursingInstitute: NursingOffice;
};
export type Time = bigint;
export interface Document {
    id: string;
    documentDate: Time;
    title: string;
    direction: Direction;
    referenceNumber?: string;
    mimeType: string;
    office: Office;
    fileSize: bigint;
    uploadTimestamp: Time;
    filename: string;
    blobId: string;
    category: Category;
    uploader: Principal;
}
export enum Category {
    pharmacyCollege = "pharmacyCollege",
    ayurvedCollege = "ayurvedCollege",
    ayurvedHospital = "ayurvedHospital",
    paramedicalInstitute = "paramedicalInstitute",
    generalCorrespondence = "generalCorrespondence",
    socialMediaEvents = "socialMediaEvents",
    nursingInstitute = "nursingInstitute"
}
export enum Direction {
    importantDocuments = "importantDocuments",
    inward = "inward",
    outward = "outward"
}
export enum GenericOffice {
    office1 = "office1",
    office2 = "office2"
}
export enum NursingOffice {
    mahatmaPhuleInstitutePbbsc = "mahatmaPhuleInstitutePbbsc",
    mahatmaPhuleNursingSchoolAkola = "mahatmaPhuleNursingSchoolAkola",
    kalaskarNursingInstituteNandura = "kalaskarNursingInstituteNandura",
    mahatmaPhuleInstituteAnm = "mahatmaPhuleInstituteAnm",
    mahatmaPhuleInstituteBsc = "mahatmaPhuleInstituteBsc",
    mahatmaPhuleInstituteGnm = "mahatmaPhuleInstituteGnm",
    mahatmaPhuleNursingSchoolBabhulgaonAnm = "mahatmaPhuleNursingSchoolBabhulgaonAnm",
    mahatmaPhuleNursingSchoolBabhulgaonGnm = "mahatmaPhuleNursingSchoolBabhulgaonGnm"
}
export interface backendInterface {
    addCategory(category: Category): Promise<void>;
    addDocument(id: string, category: Category, office: Office, direction: Direction, title: string, referenceNumber: string | null, documentDate: Time, filename: string, mimeType: string, fileSize: bigint, blobId: string): Promise<void>;
    filterDocuments(category: Category | null, office: Office | null, direction: Direction | null, startDate: Time | null, endDate: Time | null, _dummy: boolean | null): Promise<Array<Document>>;
    getCategories(): Promise<Array<Category>>;
    getDocument(id: string): Promise<Document>;
    removeDocument(id: string): Promise<void>;
}
