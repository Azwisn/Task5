using Task5_DAL;

namespace Task5_BLL;

public interface IUserService
{
    Task<User?> Register(string email, string name, string password);
    Task<User?> Login(string email, string password);
    Task<List<User>> GetUsers();
    Task BlockUsers(int[] ids);
    Task UnblockUsers(int[] ids);
    Task DeleteUsers(int[] ids);
}
