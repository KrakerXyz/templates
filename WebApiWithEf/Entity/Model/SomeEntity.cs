
using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KrakerXyz.Template.WebApiWithEf.Entity.Model {

   /// <summary></summary>
   public class SomeEntity : EntityBase {
      /// <summary></summary>
      public SomeEntity(Guid id) : base(id) {
      }
   }

   namespace Config {

      internal class CustomerConfiguration : EntityConfiguration<SomeEntity> {
         public override void Configure(EntityTypeBuilder<SomeEntity> builder) {
            base.Configure(builder);
         }
      }

      internal class SomeEntityProfile : Profile {
         public SomeEntityProfile() {
            CreateMap<SomeEntity, SomeEntityDto>().ReverseMap();
         }
      }
   }

}