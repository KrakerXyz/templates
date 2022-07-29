namespace KrakerXyz.Template.WebApiWithEf.Entity.Model {
   /// <summary>
   /// Adds soft-delete functionality to a entity by setting a Deleted property when a entity is removed and adding a default query filter to remove Deleted != null
   /// </summary>
   public interface ISoftDelete {
      /// <summary>
      /// When deleted, the date the record was deleted
      /// </summary>
      DateTime? Deleted { get; }
   }
}