
using KrakerXyz.Template.WebApiWithEf.Entity.Model;
using Microsoft.EntityFrameworkCore;

namespace KrakerXyz.Template.WebApiWithEf.Entity {

   /// <summary></summary>
   public class EntityContext : DbContext {

      /// <summary></summary>
      public EntityContext(DbContextOptions<EntityContext> options) : base(options) {
      }

#nullable disable

      /// <summary>
      /// 
      /// </summary>
      public DbSet<Model.SomeEntity> SomeEntities { get; private set; }

#nullable enable

      /// <summary></summary>
      protected override void OnModelCreating(ModelBuilder modelBuilder) {
         modelBuilder.ApplyConfigurationsFromAssembly(typeof(EntityContext).Assembly);
      }

      /// <summary>
      /// Save in-memory changes to db, updating Created/Deleted properties accordingly
      /// </summary>
      public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) {

         var changedEntities = ChangeTracker.Entries().Where(e => e.State != EntityState.Unchanged).ToList();
         var utcNow = DateTime.UtcNow;
         foreach(var entity in changedEntities) {

            // Check for a Created date property and set it to now for created and reset it to original for all other changes
            if(entity.Entity is EntityBase entityBase) {
               var efPropCreated = entity.Property(nameof(EntityBase.Created));
               if(entity.State == EntityState.Added) {
                  efPropCreated.CurrentValue = utcNow;
               } else {
                  efPropCreated.CurrentValue = efPropCreated.OriginalValue;
               }
            }

            //If this is a soft delete model and the entity is being deleted, change it to a Modify instead and update the Delete property
            if(entity.State == EntityState.Deleted && entity.Entity is ISoftDelete softDelete) {
               entity.State = EntityState.Modified;
               entity.Property(nameof(ISoftDelete.Deleted)).CurrentValue = utcNow;
            }
         }

         // Write changes to Db
         var changed = await base.SaveChangesAsync(cancellationToken);

         return changed;
      }

   }

}