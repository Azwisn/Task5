using Microsoft.AspNetCore.Mvc;
using Task5.API.Factories;
using Task5_BLL;

namespace Task5.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtFactory _jwtFactory;

        public AuthController(IUserService userService, JwtFactory jwtFactory)
        {
            _userService = userService;
            _jwtFactory = jwtFactory;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest dto)
        {
            var user = await _userService.Register(dto.Email, dto.Name, dto.Password);
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest dto)
        {
            var user = await _userService.Login(dto.Email, dto.Password);
            if (user == null) return Unauthorized("Invalid credentials");

            var token = _jwtFactory.GenerateToken(user.Id.ToString(), user.Email, user.Name);

            return Ok(new
            {
                token,
                id = user.Id,
                email = user.Email
            });
        }
    }

    public record RegisterRequest(string Email, string Name, string Password);
    public record LoginRequest(string Email, string Password);
}
