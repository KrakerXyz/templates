
using Microsoft.EntityFrameworkCore;

namespace KrakerXyz.Template.WebApiWithEf.Infrastructure.StartupExtensions {
   internal static partial class StartupExtensions {

      /// <summary>
      /// Bootstrap extension to add all required services to the app
      /// </summary>
      public static IServiceCollection AddCustomDb(this IServiceCollection services, IConfiguration configuration) {

         services.AddDbContext<Entity.EntityContext>(options => {
            var connectionString = configuration.GetConnectionString("Default");
            if(string.IsNullOrWhiteSpace(connectionString)) {
               throw new ApplicationException("Missing ConnectionStrings.Default configuration");
            }
            options.UseSqlServer(connectionString, config => {
               config.EnableRetryOnFailure();
            });
         });

         services.AddDatabaseDeveloperPageExceptionFilter();

         return services;
      }

   }
}