using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EuromonitorWebAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EuromonitorWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<AppUser> _userMananer;


        public UserProfileController(UserManager<AppUser> userMananer)
        {
            _userMananer = userMananer; 
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userMananer.FindByIdAsync(userId);
            return new
            {
                user.Firstname,
                user.Lastname,
                user.Email,
                user.UserName
            };

        }


    }
}