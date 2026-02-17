import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserProfile = {
    name : Text;
  };

  type Category = {
    id : Text;
    name : Text;
    offices : [Office];
  };

  type Office = {
    id : Text;
    name : Text;
  };

  type Document = {
    id : Text;
    categoryId : Text;
    officeId : Text;
    direction : Direction;
    title : Text;
    referenceNumber : ?Text;
    documentDate : Int;
    uploadTimestamp : Int;
    filename : Text;
    mimeType : Text;
    fileSize : Nat;
    blobId : Text;
    uploader : Principal;
  };

  type Direction = {
    #inward;
    #outward;
    #importantDocuments;
  };

  type Actor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    persistentCategories_internal : List.List<Category>;
    documents : Map.Map<Text, Document>;
  };

  public func run(old : Actor) : Actor {
    old;
  };
};
