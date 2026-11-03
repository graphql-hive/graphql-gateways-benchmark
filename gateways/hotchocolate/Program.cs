var builder = WebApplication.CreateBuilder(args);

builder.Logging.SetMinimumLevel(LogLevel.Warning);

builder.Services.AddHttpClient("fusion");

builder
    .AddGraphQLGateway()
    .AddFileSystemConfiguration("./gateway.far")
    // The other gateways in this benchmark do not run cost analysis, and the
    // benchmark query exceeds Fusion's default field cost limit (HC0047).
    .ModifyCostOptions(options => options.SkipAnalyzer = true);

var app = builder.Build();

app.MapGraphQL();
app.Run();
