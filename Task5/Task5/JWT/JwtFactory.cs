using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Task5.API.Configurations;

namespace Task5.API.Factories
{
    public class JwtFactory
    {
        private readonly AuthenticationConfiguration _authConfig;

        public JwtFactory(IOptions<AuthenticationConfiguration> authConfig)
        {
            _authConfig = authConfig.Value;
        }

        public string GenerateToken(string userId, string email, string name)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim("name", name)
            };

            var jwt = new JwtSecurityToken(
                issuer: _authConfig.Issuer,
                audience: _authConfig.Audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(_authConfig.GetSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
