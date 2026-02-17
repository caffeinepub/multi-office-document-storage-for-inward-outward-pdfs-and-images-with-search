import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import List "mo:core/List";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

// Roll forward migration
actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  type UserProfile = {
    name : Text;
  };

  type DashboardMetrics = {
    totalDocuments : Nat;
    uniqueUserCount : Nat;
    inwardDocuments : Nat;
    outwardDocuments : Nat;
    importantDocuments : Nat;
  };

  type Office = {
    id : Text;
    name : Text;
  };

  type Category = {
    id : Text;
    name : Text;
    offices : [Office];
  };

  type Direction = {
    #inward;
    #outward;
    #importantDocuments;
  };

  type Document = {
    id : Text;
    categoryId : Text;
    officeId : Text;
    direction : Direction;
    title : Text;
    referenceNumber : ?Text;
    documentDate : Time.Time;
    uploadTimestamp : Time.Time;
    filename : Text;
    mimeType : Text;
    fileSize : Nat;
    blobId : Text;
    uploader : Principal;
  };

  type PublicDocument = {
    id : Text;
    categoryId : Text;
    officeId : Text;
    direction : Direction;
    title : Text;
    referenceNumber : ?Text;
    documentDate : Time.Time;
    uploadTimestamp : Time.Time;
    filename : Text;
    mimeType : Text;
    fileSize : Nat;
    blobId : Text;
    uploader : Principal;
  };

  type UserRole = {
    #admin;
    #supervisor;
  };

  type UserAccount = {
    username : Text;
    passwordHash : Text;
    role : UserRole;
  };

  let userAccounts = Map.empty<Text, UserAccount>();

  let documents = Map.empty<Text, Document>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var persistentCategories_internal : List.List<Category> = List.empty<Category>();

  func persistentCategories() : List.List<Category> {
    persistentCategories_internal;
  };

  // User Management (admin-only)
  public shared ({ caller }) func createUser(username : Text, passwordHash : Text, role : UserRole) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create users");
    };

    let newUser : UserAccount = {
      username;
      passwordHash;
      role;
    };

    userAccounts.add(username, newUser);
  };

  public shared ({ caller }) func updateUser(username : Text, newPasswordHash : ?Text, newRole : ?UserRole) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update users");
    };

    switch (userAccounts.get(username)) {
      case (null) { Runtime.trap("User not found") };
      case (?existingUser) {
        let updatedUser : UserAccount = {
          existingUser with
          passwordHash = switch (newPasswordHash) {
            case (null) { existingUser.passwordHash };
            case (?hash) { hash };
          };
          role = switch (newRole) {
            case (null) { existingUser.role };
            case (?r) { r };
          };
        };
        userAccounts.add(username, updatedUser);
      };
    };
  };

  public shared ({ caller }) func deleteUser(username : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete users");
    };

    userAccounts.remove(username);
  };

  public query ({ caller }) func listUsers() : async [UserAccount] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can list users");
    };

    userAccounts.values().toArray();
  };

  public query ({ caller }) func getUser(username : Text) : async ?UserAccount {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get user details");
    };

    userAccounts.get(username);
  };

  // Authentication - accessible to all including guests (no authorization check needed for login)
  public query ({ caller }) func authenticate(username : Text, passwordHash : Text) : async Bool {
    switch (userAccounts.get(username)) {
      case (null) { false };
      case (?user) {
        user.passwordHash == passwordHash;
      };
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Expose dashboard metrics (authenticated query - user level, accessible to both admin and supervisor)
  public query ({ caller }) func getDashboardMetrics() : async DashboardMetrics {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view dashboard metrics");
    };

    let allDocuments = documents.values().toArray();
    let uniqueUsers = Set.empty<Principal>();

    for (doc in allDocuments.values()) {
      uniqueUsers.add(doc.uploader);
    };

    var inward = 0;
    var outward = 0;
    var important = 0;

    for (doc in allDocuments.values()) {
      switch (doc.direction) {
        case (#inward) { inward += 1 };
        case (#outward) { outward += 1 };
        case (#importantDocuments) { important += 1 };
      };
    };

    {
      totalDocuments = documents.size();
      uniqueUserCount = uniqueUsers.size();
      inwardDocuments = inward;
      outwardDocuments = outward;
      importantDocuments = important;
    };
  };

  // Category Management (admin-only - Settings page access)
  public shared ({ caller }) func addCategory(id : Text, name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add categories");
    };
    let newCategory : Category = {
      id;
      name;
      offices = [];
    };
    persistentCategories_internal.add(newCategory);
  };

  public shared ({ caller }) func updateCategory(id : Text, newName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };
    let updatedCategories = persistentCategories_internal.map<Category, Category>(
      func(c) {
        if (c.id == id) { { c with name = newName } } else { c };
      }
    );
    persistentCategories_internal := updatedCategories;
  };

  public shared ({ caller }) func removeCategory(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove categories");
    };
    let filteredCategories = persistentCategories_internal.filter(func(c) { c.id != id });
    persistentCategories_internal := filteredCategories;
  };

  // Office Management within a Category (admin-only - Settings page access)
  public shared ({ caller }) func addOfficeToCategory(categoryId : Text, officeId : Text, officeName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add offices");
    };

    let updatedCategories = persistentCategories_internal.map<Category, Category>(
      func(category) {
        if (category.id == categoryId) {
          let newOffice : Office = { id = officeId; name = officeName };
          let updatedOffices = category.offices.concat([newOffice]);
          { category with offices = updatedOffices };
        } else { category };
      }
    );
    persistentCategories_internal := updatedCategories;
  };

  public shared ({ caller }) func updateOfficeInCategory(categoryId : Text, officeId : Text, newOfficeName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update offices");
    };

    let updatedCategories = persistentCategories_internal.map<Category, Category>(
      func(category) {
        if (category.id == categoryId) {
          let updatedOffices = category.offices.map(
            func(office) {
              if (office.id == officeId) { { office with name = newOfficeName } } else { office };
            }
          );
          { category with offices = updatedOffices };
        } else { category };
      }
    );
    persistentCategories_internal := updatedCategories;
  };

  public shared ({ caller }) func removeOfficeFromCategory(categoryId : Text, officeId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove offices");
    };

    let updatedCategories = persistentCategories_internal.map<Category, Category>(
      func(category) {
        if (category.id == categoryId) {
          let filteredOffices = category.offices.filter(
            func(office) { office.id != officeId }
          );
          { category with offices = filteredOffices };
        } else { category };
      }
    );
    persistentCategories_internal := updatedCategories;
  };

  // Get all categories from the persistent list (user level - query, accessible to both admin and supervisor)
  public query ({ caller }) func getCategories() : async [Category] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view categories");
    };
    persistentCategories().toArray();
  };

  // Add a new document (user level, accessible to both admin and supervisor)
  public shared ({ caller }) func addDocument(
    id : Text,
    categoryId : Text,
    officeId : Text,
    direction : Direction,
    title : Text,
    referenceNumber : ?Text,
    documentDate : Time.Time,
    filename : Text,
    mimeType : Text,
    fileSize : Nat,
    blobId : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add documents");
    };

    let document : Document = {
      id;
      categoryId;
      officeId;
      direction;
      title;
      referenceNumber;
      documentDate;
      uploadTimestamp = Time.now();
      filename;
      mimeType;
      fileSize;
      blobId;
      uploader = caller;
    };

    documents.add(id, document);
  };

  // Remove a document (user level - only owner or admin)
  public shared ({ caller }) func removeDocument(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove documents");
    };

    switch (documents.get(id)) {
      case (null) { Runtime.trap("Document not found") };
      case (?doc) {
        // Only the uploader or an admin can remove the document
        if (doc.uploader != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the document owner or admin can remove this document");
        };
        documents.remove(id);
      };
    };
  };

  // Get a document by id (user level - query, accessible to both admin and supervisor)
  public query ({ caller }) func getDocument(id : Text) : async PublicDocument {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view documents");
    };

    switch (documents.get(id)) {
      case (null) { Runtime.trap("Document not found") };
      case (?document) {
        {
          document with
          officeId = document.officeId;
          categoryId = document.categoryId;
        };
      };
    };
  };

  // Filter documents by category, office, direction, and date range (user level, accessible to both admin and supervisor)
  public shared ({ caller }) func filterDocuments(
    categoryId : ?Text,
    officeId : ?Text,
    direction : ?Direction,
    startDate : ?Time.Time,
    endDate : ?Time.Time,
    _dummy : ?Bool,
  ) : async [PublicDocument] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can filter documents");
    };

    let filtered = documents.values().toArray().filter(
      func(document) {
        categoryMatches(document, categoryId) and officeMatches(document, officeId) and directionMatches(document, direction) and dateMatches(document, startDate, endDate)
      }
    );
    filtered.map(
      func(document) {
        {
          document with
          categoryId = document.categoryId;
        };
      }
    );
  };

  func categoryMatches(document : Document, categoryId : ?Text) : Bool {
    switch (categoryId) {
      case (null) { true };
      case (?cid) { document.categoryId == cid };
    };
  };

  func officeMatches(document : Document, officeId : ?Text) : Bool {
    switch (officeId) {
      case (null) { true };
      case (?oid) { document.officeId == oid };
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
};
