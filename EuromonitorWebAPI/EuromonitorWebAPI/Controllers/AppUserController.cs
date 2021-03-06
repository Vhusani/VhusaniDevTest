using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using EuromonitorWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EuromonitorWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private UserManager<AppUser> _userMananer;
        private SignInManager<AppUser> _signInManager;
        private readonly AppSettings _appSettings; 

        public AppUserController(UserManager<AppUser> userMananer, SignInManager<AppUser> signInManager, IOptions<AppSettings> appSettings)
        {
            _userMananer = userMananer;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        //POST: /api/AppUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            var appUser = new AppUser() {
                UserName = model.UserName,
                Email = model.Email,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
            };

            try
            {
                var result = await _userMananer.CreateAsync(appUser, model.Password);
                return Ok(result); 
            }
            catch (Exception ex)
            {

                throw ex;
            }

    }

        [HttpPost]
        [Route("Login")]
        //POST: /api/AppUser/Login
        public async Task<IActionResult> Login(LoginModel model) {
            var user = await _userMananer.FindByNameAsync(model.UserName);
            if (user != null && await _userMananer.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserID", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(30),

                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWTSecret)), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new
                {
                    token
                });
            }
            else {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
        }

    }
}