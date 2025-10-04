using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task5_BLL;

namespace Task5.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]

public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService) => _userService = userService;

    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] string? search)
    {
        var users = await _userService.GetUsers();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            users = users
                .Where(u => u.Email.ToLower().Contains(search) || u.Name.ToLower().Contains(search))
                .ToList();
        }

        return Ok(users);
    }

    [HttpPost("block")]
    public async Task<IActionResult> Block([FromBody] int[] ids)
    {
        await _userService.BlockUsers(ids);
        return Ok();
    }

    [HttpPost("unblock")]
    public async Task<IActionResult> Unblock([FromBody] int[] ids)
    {
        await _userService.UnblockUsers(ids);
        return Ok();
    }

    [HttpPost("delete")]
    public async Task<IActionResult> Delete([FromBody] int[] ids)
    {
        await _userService.DeleteUsers(ids);
        return Ok();
    }
}
