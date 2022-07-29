using System.Linq;
using AutoMapper;
using KrakerXyz.Template.WebApiWithEf.Entity;
using KrakerXyz.Template.WebApiWithEf.Entity.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KrakerXyz.Template.WebApiWithEf.Controllers;

/// <summary></summary>
[ApiController]
public class SomeEntityList : ControllerBase {

   private readonly EntityContext _entityContext;
   private readonly IMapper _mapper;

   /// <summary></summary>
   public SomeEntityList(EntityContext entityContext, IMapper mapper) {
      _entityContext = entityContext;
      _mapper = mapper;
   }

   /// <summary></summary>
   [HttpGet("api/some-entity")]
   public IAsyncEnumerable<SomeEntityDto> Get() {
      var entities = _entityContext.SomeEntities.AsNoTracking().AsAsyncEnumerable().Select(x => _mapper.Map<SomeEntityDto>(x));
      return entities;
   }
}
