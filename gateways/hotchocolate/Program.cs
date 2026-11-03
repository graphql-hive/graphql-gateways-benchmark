var builder = WebApplication.CreateBuilder(args);

builder.Logging.SetMinimumLevel(LogLevel.Warning);

// Run request processing inline on the socket thread instead of the thread pool
// (pairs with DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS=1 in run.sh).
builder.WebHost.UseSockets(o => o.UnsafePreferInlineScheduling = true);

builder.Services
    .AddHttpClient("fusion")
    // The default logging handlers add two async state machines per subgraph call
    // even when logging is off.
    .RemoveAllLoggers()
    .ConfigurePrimaryHttpMessageHandler(
        () => new SocketsHttpHandler
        {
            MaxConnectionsPerServer = 256
        });

builder
    // The other gateways in this benchmark enforce no cost or depth limits, and
    // the benchmark query exceeds Fusion's default field cost limit (HC0047).
    .AddGraphQLGateway(disableDefaultSecurity: true)
    .AddFileSystemConfiguration("./gateway.far");

var app = builder.Build();

app.MapGraphQL();
app.Run();
