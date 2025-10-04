using Microsoft.EntityFrameworkCore;
using Task5_DAL;

namespace Task5_BLL;

public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db) => _db = db;

    public async Task<User?> Register(string email, string name, string password)
    {
        var user = new User
        {
            Email = email,
            Name = name,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            Status = "unverified"
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
        return user;
    }

    public async Task<User?> Login(string email, string password)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return null;
        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash)) return null;
        if (user.Status == "blocked") return null;

        user.LastLogin = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return user;
    }

    public async Task<List<User>> GetUsers() =>
        await _db.Users.OrderByDescending(u => u.LastLogin).ToListAsync();

    public async Task BlockUsers(int[] ids)
    {
        var users = await _db.Users.Where(u => ids.Contains(u.Id)).ToListAsync();
        users.ForEach(u => u.Status = "blocked");
        await _db.SaveChangesAsync();
    }

    public async Task UnblockUsers(int[] ids)
    {
        var users = await _db.Users.Where(u => ids.Contains(u.Id)).ToListAsync();
        users.ForEach(u => u.Status = "active");
        await _db.SaveChangesAsync();
    }

    public async Task DeleteUsers(int[] ids)
    {
        var users = await _db.Users.Where(u => ids.Contains(u.Id)).ToListAsync();
        _db.Users.RemoveRange(users);
        await _db.SaveChangesAsync();
    }
}
