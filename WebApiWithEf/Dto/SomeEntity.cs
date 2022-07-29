
namespace KrakerXyz.Template.WebApiWithEf {

   /// <summary></summary>
   public class SomeEntityDto {

      /// <summary></summary>
      public SomeEntityDto(Guid id, DateTime created, string name) {
         Id = id;
         Created = created;
         Name = name;
      }

      /// <summary></summary>
      public Guid Id { get; private set; }

      /// <summary></summary>
      public DateTime Created { get; private set; }

      /// <summary></summary>
      public string Name { get; set; }

   }

}