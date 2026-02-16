import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";



actor {
  include MixinStorage();

  type Category = {
    #nursingInstitute;
    #paramedicalInstitute;
    #ayurvedCollege;
    #ayurvedHospital;
    #pharmacyCollege;
    #generalCorrespondence;
    #socialMediaEvents;
  };

  type NursingOffice = {
    #mahatmaPhuleNursingSchoolAkola;
    #mahatmaPhuleInstituteAnm;
    #mahatmaPhuleInstituteGnm;
    #mahatmaPhuleInstituteBsc;
    #mahatmaPhuleInstitutePbbsc;
    #kalaskarNursingInstituteNandura;
    #mahatmaPhuleNursingSchoolBabhulgaonAnm;
    #mahatmaPhuleNursingSchoolBabhulgaonGnm;
  };

  type GenericOffice = {
    #office1;
    #office2;
  };

  type Office = {
    #nursingInstitute : NursingOffice;
    #paramedicalInstitute : GenericOffice;
    #ayurvedCollege : GenericOffice;
    #ayurvedHospital : GenericOffice;
    #pharmacyCollege : GenericOffice;
    #generalCorrespondence : GenericOffice;
    #socialMediaEvents : GenericOffice;
  };

  type Direction = {
    #inward;
    #outward;
    #importantDocuments;
  };

  type Document = {
    id : Text;
    category : Category;
    office : Office;
    direction : Direction;
    title : Text;
    referenceNumber : ?Text;
    documentDate : Time.Time;
    uploadTimestamp : Time.Time;
    uploader : Principal;
    filename : Text;
    mimeType : Text;
    fileSize : Nat;
    blobId : Text;
  };

  let documents = Map.empty<Text, Document>();

  // Add a new document (must be authenticated)
  public shared ({ caller }) func addDocument(
    id : Text,
    category : Category,
    office : Office,
    direction : Direction,
    title : Text,
    referenceNumber : ?Text,
    documentDate : Time.Time,
    filename : Text,
    mimeType : Text,
    fileSize : Nat,
    fileId : Text,
  ) : async () {
    ensureAuthenticated(caller);

    let document : Document = {
      id;
      category;
      office;
      direction;
      title;
      referenceNumber;
      documentDate;
      uploadTimestamp = Time.now();
      uploader = caller;
      filename;
      mimeType;
      fileSize;
      blobId = fileId; // Store only the reference to the blob ID
    };

    documents.add(id, document);
  };

  // Remove a document (must be authenticated)
  public shared ({ caller }) func removeDocument(id : Text) : async () {
    ensureAuthenticated(caller);
    switch (documents.get(id)) {
      case (null) { Runtime.trap("Document not found") };
      case (?_) {
        documents.remove(id);
      };
    };
  };

  // Get a document by id (authenticated)
  public shared ({ caller }) func getDocument(id : Text) : async Document {
    ensureAuthenticated(caller);
    switch (documents.get(id)) {
      case (null) { Runtime.trap("Document not found") };
      case (?document) { document };
    };
  };

  // Filter documents by category, office, direction, and date range
  public shared ({ caller }) func filterDocuments(
    category : ?Category,
    office : ?Office,
    direction : ?Direction,
    startDate : ?Time.Time,
    endDate : ?Time.Time,
  ) : async [Document] {
    ensureAuthenticated(caller);

    documents.values().toArray().filter(
      func(document) {
        categoryMatches(document, category) and officeMatches(document, office) and directionMatches(document, direction) and dateMatches(document, startDate, endDate)
      }
    );
  };

  func categoryMatches(document : Document, category : ?Category) : Bool {
    switch (category) {
      case (null) { true };
      case (?c) { document.category == c };
    };
  };

  func officeMatches(document : Document, office : ?Office) : Bool {
    switch (office) {
      case (null) { true };
      case (?o) { document.office == o };
    };
  };

  func directionMatches(document : Document, direction : ?Direction) : Bool {
    switch (direction) {
      case (null) { true };
      case (?d) { document.direction == d };
    };
  };

  func dateMatches(document : Document, startDate : ?Time.Time, endDate : ?Time.Time) : Bool {
    let afterStart = switch (startDate) {
      case (null) { true };
      case (?start) { document.documentDate >= start };
    };
    let beforeEnd = switch (endDate) {
      case (null) { true };
      case (?end) { document.documentDate <= end };
    };
    afterStart and beforeEnd;
  };

  // Helper function to ensure the caller is authenticated
  func ensureAuthenticated(caller : Principal) {
    let anonymous : Principal = Principal.fromText("2vxsx-fae");
    if (caller == anonymous) {
      Runtime.trap("Anonymous calls are not allowed");
    };
  };
};
