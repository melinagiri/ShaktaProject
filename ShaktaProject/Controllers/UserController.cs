using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShaktaProject.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShaktaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsers(
           [FromQuery] int? ward,
           [FromQuery] string? fullName,
           [FromQuery] string? caste,
           [FromQuery] string? sex,
           [FromQuery] int? age,
           [FromQuery] string? religion,
           [FromQuery] string? education,
           [FromQuery] string? occupation,
           [FromQuery] string? disability,
           [FromQuery] string? sortBy = "FullName",
           [FromQuery] bool desc = false,
           [FromQuery] int page = 1,
           [FromQuery] int pageSize = 10)
        {
            Console.WriteLine($"Received Search Request: ward={ward}, fullName={fullName}, caste={caste}, age={age}");

            var query = _context.Users.AsQueryable();

            if (ward.HasValue)
                query = query.Where(u => u.Ward == ward.Value);

            if (!string.IsNullOrEmpty(fullName))
                query = query.Where(u => u.FullName.Contains(fullName));

            if (!string.IsNullOrEmpty(caste))
                query = query.Where(u => u.Caste.Contains(caste));

            if (!string.IsNullOrEmpty(sex))
                query = query.Where(u => u.Sex == sex);

            if (age.HasValue)
                query = query.Where(u => u.Age == age.Value);

            if (!string.IsNullOrEmpty(religion))
                query = query.Where(u => u.Religion.Contains(religion));

            if (!string.IsNullOrEmpty(education))
                query = query.Where(u => u.Education.Contains(education));

            if (!string.IsNullOrEmpty(occupation))
                query = query.Where(u => u.Occupation.Contains(occupation));

            if (!string.IsNullOrEmpty(disability))
                query = query.Where(u => u.Disability.Contains(disability));

            // Sorting
            query = sortBy.ToLower() switch
            {
                "ward" => desc ? query.OrderByDescending(u => u.Ward) : query.OrderBy(u => u.Ward),
                "age" => desc ? query.OrderByDescending(u => u.Age) : query.OrderBy(u => u.Age),
                "religion" => desc ? query.OrderByDescending(u => u.Religion) : query.OrderBy(u => u.Religion),
                "education" => desc ? query.OrderByDescending(u => u.Education) : query.OrderBy(u => u.Education),
                "occupation" => desc ? query.OrderByDescending(u => u.Occupation) : query.OrderBy(u => u.Occupation),
                "disability" => desc ? query.OrderByDescending(u => u.Disability) : query.OrderBy(u => u.Disability),
                _ => desc ? query.OrderByDescending(u => u.FullName) : query.OrderBy(u => u.FullName),
            };

            // Pagination
            var totalRecords = await query.CountAsync();
            var users = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { totalRecords, users });
        }

        // ✅ GET: api/user (Fetch all users)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // ✅ GET: api/user/5 (Fetch a single user by ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // ✅ POST: api/user (Create a new user)
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            // Check if the model is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }


        // ✅ PUT: api/user/5 (Update a user)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // ✅ DELETE: api/user/5 (Delete a user)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // In UserController.cs

        [HttpGet("sex-distribution")]
        public async Task<ActionResult<IEnumerable<object>>> GetSexDistribution()
        {
            Console.WriteLine("Fetching sex distribution..."); // Debug here

            var distribution = await _context.Users
                .GroupBy(u => u.Sex)
                .Select(g => new
                {
                    Sex = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            Console.WriteLine("Sex distribution data:", distribution); // Debug here
            return Ok(distribution);
        }




    }
}
