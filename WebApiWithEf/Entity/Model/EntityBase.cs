
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KrakerXyz.Template.WebApiWithEf.Entity.Model {

   /// <summary>
   /// Base properties for an entity
   /// </summary>
   public abstract class EntityBase {

      /// <summary></summary>
      public EntityBase(Guid id) {
         Id = id;
      }

      /// <summary>
      /// The id
      /// </summary>
      public Guid Id { get; private set; }

      /// <summary>
      /// UTC Timestamp the record was first created
      /// </summary>
      public DateTime Created { get; private set; } = DateTime.UtcNow;

      /// <summary>
      /// Concurrency Token
      /// </summary>
      public byte[] RowVersion { get; set; } = Array.Empty<byte>();
   }

   namespace Config {

      internal abstract class EntityConfiguration<T> : IEntityTypeConfiguration<T> where T : EntityBase {
         public virtual void Configure(EntityTypeBuilder<T> builder) {
            builder.HasKey(x => x.Id).IsClustered(false);
            builder.HasIndex(x => x.Created).IsClustered();
            builder.Property(x => x.RowVersion).IsConcurrencyToken().IsRowVersion();

            var properties = typeof(T).GetProperties();
            foreach(var p in properties) {
               var pt = p.PropertyType;
               if(!pt.IsEnum) { continue; }
               var names = Enum.GetNames(pt);
               var maxLength = names.Select(n => n.Length).Max();
               builder.Property(p.Name).HasConversion<string>().HasMaxLength(maxLength);
            }

            if(typeof(T).IsAssignableTo(typeof(ISoftDelete))) {
               builder.HasQueryFilter(x => ((ISoftDelete)x).Deleted == null);
            }

         }
      }

   }
}