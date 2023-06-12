export const homePage = `
<!DOCTYPE html>
<html>
  <head>
    <title>tRPC API Boilerplate</title>
  </head>
  <body>
    <img src="https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate/main/misc/heisenberg.png" />
    <h3>tRPC API Boilerplate</h3>
    <br />
    <div style="color:black; font-style: italic; font-size: 18px;">
    Router:
      <ul>
        User
        <li><a title="Query - /trpc/user.list" href="/trpc/user.list">List</a></li>
      </ul>
      <ul>
        Batch
        <li><a title="Query - /trpc/batch.list" href="/trpc/batch.list">List</a></li>
      </ul>
      <ul>
        Util
        <li>
          <form method="post" action="/trpc/util.seedDb">
            <button type="submit" title="Mutation - /trpc/util.seedDb">Seed DB</button>
          </form>
        </li>
      </ul>
    </div>
  </body>
</html>
`;
