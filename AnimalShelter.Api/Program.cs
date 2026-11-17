using AnimalShelter.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// Реєстрація контролерів
builder.Services.AddControllers();

builder.Services.AddSingleton<SqlConnectionFactory>();

// Налаштування Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger у режимі розробки
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");
app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
