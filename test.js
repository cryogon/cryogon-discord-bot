import fetch from "node-fetch";
(async () => {
  const data = await fetch("").then((meme) =>
    meme.json()
  );
  console.log(data);
})();
