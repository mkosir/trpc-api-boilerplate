import { getVersionInfo } from './version';

export const homePage = `
<!DOCTYPE html>
<html>
  <head>
    <title>tRPC API Boilerplate</title>
  </head>
  <body>
    <img src="https://raw.githubusercontent.com/mkosir/trpc-fe-boilerplate-vite/main/misc/heisenberg.png" />
    <h3>tRPC API Boilerplate</h3>
    <div style="color:gray; font-style: italic; font-size: 15px; display: none;">${getVersionInfo()}</div>
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
          <button id="seedDbButton" title="Mutation - /trpc/util.seedDb">Seed DB</button>
          <span id="seedDbLabel" style="display:none; margin-left:10px;">✅ DB seeded</span>
        </li>
      </ul>
    </div>
    <script>
      const button = document.getElementById('seedDbButton');
      const label = document.getElementById('seedDbLabel');
      button.addEventListener('click', () => {
        fetch('/trpc/util.seedDb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        label.style.display = 'inline';
        setTimeout(() => {
          label.style.display = 'none';
        }, 2000);
      });
    </script>
  </body>
</html>
`;
