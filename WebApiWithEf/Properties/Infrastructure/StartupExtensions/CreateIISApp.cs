
using KrakerXyz.Template.WebApiWithEf.Infrastructure.StartupExtensions;

namespace KrakerXyz.Template.WebApiWithEf {

   internal static partial class StartupExtensions {

      /// <summary>
      /// Bootstrap extension to add all required services to the app
      /// </summary>
      public static WebApplication CreateWebApplication(this WebApplicationBuilder builder) {

         builder.Services.AddControllers();
         // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
         builder.Services.AddEndpointsApiExplorer();
         builder.Services.AddSwaggerGen();

         builder.Services.AddCustomDb(builder.Configuration);

         builder.Services.AddAutoMapper(typeof(Program).Assembly);

         var app = builder.Build();


         // Configure the HTTP request pipeline.
         if(app.Environment.IsDevelopment()) {
            app.UseSwagger();
            app.UseSwaggerUI();
         }

         app.UseHttpsRedirection();

         app.UseAuthorization();

         app.MapControllers();

         return app;
      }

   }

}