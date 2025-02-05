using Microsoft.EntityFrameworkCore;

namespace ShaktaProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Define your tables
        public DbSet<User> Users { get; set; }
    }

    public class User  // Sample Model
    {
		public int Id { get; set; }
		public int Ward { get; set; }
		public required string FullName { get; set; }  // Required
		public required string Caste { get; set; }
		public required string Sex { get; set; }
		public int Age { get; set; }
		public required string Religion { get; set; }
		public required string Education { get; set; }
		public required string Occupation { get; set; }
		public required string Disability { get; set; }
	}
}
