using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Task5.API.Configurations
{
    public class AuthenticationConfiguration
    {
        public string Issuer { get; set; } = "MyApp";
        public string Audience { get; set; } = "MyAppAudience";
        public string EncryptionKey { get; set; } = "12345678901234567890123456789012";

        public SecurityKey GetSecurityKey() =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(EncryptionKey));
    }
}
