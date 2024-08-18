const BlockType = require("../../extension-support/block-type");
const ArgumentType = require("../../extension-support/argument-type");
const Cast = require("../../util/cast");

const { Cast, ArgumentType, BlockType } = Scratch;

Scratch.translate.setup({});
let messageText = "";
const formatMessage = Scratch.translate;
const lang = (id, defaultValue) =>
  Scratch.translate({ id: id, default: defaultValue });

const SymbolsNerdFont =
  "data:font/ttf;base64," +
  "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";
let IconFont = document.createElement("style");
IconFont.appendChild(
  document.createTextNode(`
        @font-face {
            font-family: 'IconFont';
            src: url('${SymbolsNerdFont}');
        }
    `),
);
document.head.appendChild(IconFont);

const inputIcon =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMjIiCiAgIGhlaWdodD0iMjIiCiAgIHZpZXdCb3g9IjAgMCA1LjgyMDgzMzMgNS44MjA4MzM0IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjMuMSAoOTFiNjZiMDc4MywgMjAyMy0xMS0xNikiCiAgIHNvZGlwb2RpOmRvY25hbWU9Iue7mOWbvi5zdmciCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxIgogICAgIHBhZ2Vjb2xvcj0iIzUwNTA1MCIKICAgICBib3JkZXJjb2xvcj0iI2VlZWVlZSIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjNTA1MDUwIgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIKICAgICBpbmtzY2FwZTp6b29tPSIzNy43NzI3MjciCiAgICAgaW5rc2NhcGU6Y3g9IjkuMjI2MjMzNSIKICAgICBpbmtzY2FwZTpjeT0iMTEuNjYxODUzIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDI3IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTEyIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzEiIC8+PGRlZnMKICAgICBpZD0iZGVmczEiIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIgogICAgIGQ9Ik0gMS4yMjQ5MDY1LDQuOTc5ODQ5NyBDIDEuMTUzMjY5NCw0Ljk2NTQxMjkgMS4xMDg3OTU2LDQuOTIyNzM0NCAxLjA4MTM3MzgsNC44NDIxMTEgMS4wNTYzNjA2LDQuNzY4NTY5MiAxLjA1MzY3ODYsNC43Mzc1NjIyIDEuMDUzNjc4Niw0LjUyMTkyNTEgYyAwLC0wLjE3NDk3ODcgMC4wMDEzNiwtMC4yMDkzNDc5IDAuMDEwMTE4LC0wLjI1NjAwODkgQyAxLjA5NjU2OTQsNC4wOTEzNDg4IDEuMTY2MDg5NCw0LjAwMTgyOTEgMS4zNTgxNDgyLDMuODg2ODg0OSAxLjM5MjI2MzIsMy44NjY0Njc3IDEuNTE3MTg5NCwzLjc5Njk0MDcgMS42MzU3NjE5LDMuNzMyMzgwNiAyLjQ0NjYwNiwzLjI5MDg5NDIgMi42OTg2MjE1LDMuMTUyNzMwMSAyLjc0NTc2MjcsMy4xMjM4Mzc4IDIuODU0MDAwNywzLjA1NzQ5OTkgMi45MTIwMDE4LDIuOTgzMDM2OSAyLjkxMjAwMTgsMi45MTA0MTY2IGMgMCwtMC4wNzI2MiAtMC4wNTgwMDEsLTAuMTQ3MDgzMyAtMC4xNjYyMzkxLC0wLjIxMzQyMTIgQyAyLjY5ODYyMTUsMi42NjgxMDMxIDIuNDQ2NjA2LDIuNTI5OTM5IDEuNjM1NzYxOSwyLjA4ODQ1MjYgMS41MTcxODk0LDIuMDIzODkyNSAxLjM5MjI2MzIsMS45NTQzNjU1IDEuMzU4MTQ4MiwxLjkzMzk0ODMgMS4xNjYwODk0LDEuODE5MDA0MSAxLjA5NjU2OTQsMS43Mjk0ODQ0IDEuMDYzNzk2OSwxLjU1NDkxNyAxLjA1NTAzNywxLjUwODI1NiAxLjA1MzY3ODYsMS40NzM4ODY4IDEuMDUzNjc4NiwxLjI5ODkwODIgYyAwLC0wLjIxNTYzNzIgMC4wMDI2OCwtMC4yNDY2NDQyIDAuMDI3Njk1LC0wLjMyMDE4NjAyIDAuMDMzMzk1LC0wLjA5ODE4NTkgMC4wODk4NywtMC4xMzk5MzcyOSAwLjE4ODM5MSwtMC4xMzkyNzYxOCAwLjA4NjU5Miw1LjgxMDZlLTQgMC4xMjQ2MjI1LDAuMDE2OTM1MyAwLjQ0Mzg1MSwwLjE5MDg2NzIgMC4xNTI4MjUsMC4wODMyNjcgMC4zMTkwOTQ2LDAuMTczODE2IDAuMzY5NDg3OSwwLjIwMTIyMDUgMC4wNTAzOTMsMC4wMjc0MDQgMC40MDIwNjg3LDAuMjE5MDE5OSAwLjc4MTUwMDgsMC40MjU4MTIgMC4zNzk0MzIxLDAuMjA2NzkyMiAwLjc3NDc2MzcsMC40MjIxNjY4IDAuODc4NTE0NiwwLjQ3ODYxMDIgMC45MjM4MTE5LDAuNTAyNTc5MyAxLjAwMjI0MzEsMC41NDYwOSAxLjA1NjM3MzUsMC41ODYwMzY3IDAuMTYyNzI3MiwwLjEyMDA4ODIgMC4xNjI3MjcyLDAuMjU2NzU5OSAwLDAuMzc2ODQ4IEMgNC43NDUzNjIyLDMuMTM4Nzg3MyA0LjY2NjkzMSwzLjE4MjI5OCAzLjc0MzExOTEsMy42ODQ4NzczIDMuNjM5MzY4MiwzLjc0MTMyMDcgMy4yNDQwMzY2LDMuOTU2Njk1MyAyLjg2NDYwNDUsNC4xNjM0ODc1IDIuNDg1MTcyNCw0LjM3MDI3OTYgMi4xMzM0OTcxLDQuNTYxODk1MSAyLjA4MzEwMzcsNC41ODkyOTk1IDIuMDMyNzEwNCw0LjYxNjcwNCAxLjg2NjQ0MDgsNC43MDcyNTMyIDEuNzEzNjE1OCw0Ljc5MDUyIDEuNDkyMjAzMyw0LjkxMTE1NjggMS40MjQzMTUsNC45NDU2Nzc0IDEuMzc5NDU2OCw0Ljk2MDQzNyAxLjMxOTExNzUsNC45ODAyOTAzIDEuMjYyNDI3LDQuOTg3NDExIDEuMjI0OTA2NSw0Ljk3OTg0OTcgWiIKICAgICBpZD0icGF0aDEiIC8+PC9zdmc+Cg==";
const closeIcon =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5jbG9zZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJjbG9zZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTE1LjQ2NDkzNSwxNS40NjcyOTcgQzE0Ljc2NDQwNTksMTYuMTc3NzcwNSAxMy42MTg1ODc3LDE2LjE3Nzc3MDUgMTIuOTA4MTE0MiwxNS40NjcyOTcgTDkuOTk4ODE4OTksMTIuNTU4MDAxOCBMNy4wODg0MTg4NSwxNS40NjcyOTcgQzYuMzgyMzY1MDYsMTYuMTczMzUwOCA1LjIzNzY1MTg3LDE2LjE3MzM1MDggNC41MzE1OTgwNywxNS40NjcyOTcgQzQuMTc5MTIzNjQsMTUuMTE0ODIyNiA0LjAwMDEyNDA5LDE0LjY0ODUzOTggNC4wMDAxMjQwOSwxNC4xODg4ODY2IEM0LjAwMDEyNDA5LDEzLjcyODEyODUgNC4xNzkxMjM2NCwxMy4yNjI5NTA2IDQuNTMxNTk4MDcsMTIuOTEwNDc2MiBMNy40NDA4OTMyOCwxMC4wMDExODEgTDQuNTI3MTc4MzMsNy4wODYzNjExMiBDNC4xNzM1OTg5Nyw2LjczMjc4MTc2IDMuOTk0NTk5NDEsNi4yNjc2MDM5MSA0LjAwMDEyNDA5LDUuODAyNDI2MDYgQzQuMDAwMTI0MDksNS4zNDE2Njc5NSA0LjE3MzU5ODk3LDQuODgyMDE0NzcgNC41MjcxNzgzMyw0LjUyOTU0MDM0IEM1LjIzMjEyNzE5LDMuODIzNDg2NTUgNi4zNzY4NDAzOCwzLjgyMzQ4NjU1IDcuMDgzOTk5MTEsNC41Mjk1NDAzNCBMOS45OTg4MTg5OSw3LjQ0MzI1NTI5IEwxMi45MTI1MzM5LDQuNTI5NTQwMzQgQzEzLjYxODU4NzcsMy44MjM0ODY1NSAxNC43NjQ0MDU5LDMuODIzNDg2NTUgMTUuNDcwNDU5Nyw0LjUyOTU0MDM0IEMxNi4xNzY1MTM0LDUuMjM0NDg5MiAxNi4xNzY1MTM0LDYuMzgwMzA3MzMgMTUuNDcwNDU5Nyw3LjA4NjM2MTEyIEwxMi41NTQ1MzQ4LDEwLjAwMTE4MSBMMTUuNDcwNDU5NywxMi45MTQ4OTYgQzE2LjE3NjUxMzQsMTMuNjIwOTQ5NyAxNi4xNzY1MTM0LDE0Ljc1NTcxODUgMTUuNDY0OTM1LDE1LjQ2NzI5NyIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=";
const clearIcon =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxkZWZzPjxwYXRoIGQ9Ik00LjU0OCA3aDEwLjkwNGEuNS41IDAgMCAxIC40OTguNTQ1bC0uNzg1IDguNjM1QTIgMiAwIDAgMSAxMy4xNzQgMThINi44MjdhMiAyIDAgMCAxLTEuOTkyLTEuODJMNC4wNSA3LjU0NkEuNS41IDAgMCAxIDQuNTQ4IDd6bTIuNzg1LTMgLjU1My0xLjY1OEEuNS41IDAgMCAxIDguMzYgMmgzLjI4YS41LjUgMCAwIDEgLjQ3NC4zNDJMMTIuNjY3IDRIMTYuNWEuNS41IDAgMCAxIC41LjV2MWEuNS41IDAgMCAxLS41LjVoLTEzYS41LjUgMCAwIDEtLjUtLjV2LTFhLjUuNSAwIDAgMSAuNS0uNWgzLjgzM3ptMS4wNTQgMGgzLjIyNmwtLjMzNC0xSDguNzIxbC0uMzM0IDF6TTEwIDExLjcybDEuNTk1LTEuNTk1YS41LjUgMCAwIDEgLjcwNyAwbC4wNzMuMDczYS41LjUgMCAwIDEgMCAuNzA3TDEwLjc4IDEyLjVsMS41OTUgMS41OTVhLjUuNSAwIDAgMSAwIC43MDdsLS4wNzMuMDczYS41LjUgMCAwIDEtLjcwNyAwTDEwIDEzLjI4bC0xLjU5NSAxLjU5NWEuNS41IDAgMCAxLS43MDcgMGwtLjA3My0uMDczYS41LjUgMCAwIDEgMC0uNzA3TDkuMjIgMTIuNWwtMS41OTUtMS41OTVhLjUuNSAwIDAgMSAwLS43MDdsLjA3My0uMDczYS41LjUgMCAwIDEgLjcwNyAwTDEwIDExLjcyeiIgaWQ9ImEiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2IpIiBmaWxsPSIjRkZGIj48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=";
const extIcon =
  "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NS4xMTYwNSIgaGVpZ2h0PSI4NS4xMTYxNiIgdmlld0JveD0iMCwwLDg1LjExNjA1LDg1LjExNjE2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3LjQ0MTk3LC0xMzcuNDQxOTIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTk3LjQ0MTk3LDIyMi41NTgwOHYtODUuMTE2MTZoODUuMTE2MDV2ODUuMTE2MTZ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIxMS43NzQ5NCwyMTEuOTQ0NTNjLTcuMDYzNzksMCAtMTIuNzkwMTIsLTUuNzI2MzMgLTEyLjc5MDEyLC0xMi43OTAxMnYtMzguMzA4NzljMCwtNy4wNjM3OSA1LjcyNjMzLC0xMi43OTAxMiAxMi43OTAxMiwtMTIuNzkwMTJoNTYuNDUwMTJjNy4wNjM3OSwwIDEyLjc5MDEyLDUuNzI2MzMgMTIuNzkwMTIsMTIuNzkwMTJ2MzguMzA4NzljMCw3LjA2Mzc5IC01LjcyNjMzLDEyLjc5MDEyIC0xMi43OTAxMiwxMi43OTAxMnoiIGZpbGw9IiMzZjNmM2YiLz48cGF0aCBkPSJNMjA2LjU1MTc3LDE2NC4zOTIxM2wyMi4wNjU4NywxNS42NzMyNWwtMjEuODA5OTQsMTUuNDE4MzFsLTAuMDgwMzUsLTcuODk1NjNsMTIuNjk2MjksLTcuNTQ3MTRsLTEyLjc5NzQ2LC04LjU2OTkxeiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yMjkuOTUxMTMsMTk1LjE4NDUydi01LjMzOTAzaDI1LjIwNTE3djUuMzM5MDN6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDIuNTU4MDI1NzYwODY2NDM6NDIuNTU4MDc5MDgzMTA1NDEtLT4=";
const rtlLang = [];
let isDark = true;
let forceTheme = true;
let isRTL = rtlLang.includes(localStorage.getItem("tw:language"));

let consoleWindowShown = false;
let defaultHelpMessage = "enable";

let consoleWindow = document.createElement("div");
consoleWindow.style.position = "fixed";
consoleWindow.style.top = "50%";
consoleWindow.style.left = "50%";
consoleWindow.style.transform = "translate(-50%, -50%)";
consoleWindow.style.width = "600px";
consoleWindow.style.height = "400px";
consoleWindow.style.overflow = "auto";
consoleWindow.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
consoleWindow.style.display = "none";
consoleWindow.style.fontFamily =
  "IconFont, Cascadia Code, Consolas, Courier New, Menlo, ç»å¤å, monospace";
consoleWindow.style.overflowX = "hidden";
consoleWindow.style.zIndex = 999;
document.body.appendChild(consoleWindow);

let isDragging = false;
let offset = { x: 0, y: 0 };
let titleBar = document.createElement("div");
titleBar.style.height = "40px";
titleBar.style.lineHeight = "40px";
titleBar.style.paddingLeft = "12px";
titleBar.style.paddingRight = "12px";
titleBar.style.cursor = "move";
titleBar.style.fontSize = "16px";
titleBar.innerText = "Console";
titleBar.style.position = "sticky";
titleBar.style.top = "0px";
titleBar.style.textAlign = "center";
consoleWindow.appendChild(titleBar);

let content = document.createElement("div");
content.style.position = "absolute";
content.style.width = "100%";
content.style.height = "360px";
content.style.bottom = "0";
content.style.overflow = "auto";
content.style.paddingTop = "5px";
consoleWindow.appendChild(content);

let closeButton = document.createElement("img");
closeButton.src = closeIcon;
closeButton.style.position = "absolute";
closeButton.style.top = "12px";
closeButton.style.width = "16px";
closeButton.style.height = "16px";
closeButton.style.cursor = "pointer";
closeButton.classList.add("icon");
titleBar.appendChild(closeButton);

closeButton.addEventListener("click", () => {
  consoleWindow.style.display = "none";
  inputWindow.style.display = "none";
  consoleWindowShown = false;
});

let clearButton = document.createElement("img");
clearButton.src = clearIcon;
clearButton.style.position = "absolute";
clearButton.style.top = "12px";
clearButton.style.width = "16px";
clearButton.style.height = "16px";
clearButton.style.cursor = "pointer";
clearButton.classList.add("icon");
titleBar.appendChild(clearButton);

clearButton.addEventListener("click", () => {
  clearConsoleText();
});

let inputButton = document.createElement("img");
inputButton.src = inputIcon;
inputButton.style.position = "absolute";
inputButton.style.top = "12px";
inputButton.style.width = "16px";
inputButton.style.height = "16px";
inputButton.style.cursor = "pointer";
inputButton.classList.add("icon");
titleBar.appendChild(inputButton);

let inputWindow = document.createElement("div");
inputWindow.style.position = "absolute";
inputWindow.style.top = `calc(${consoleWindow.style.top} + 228px)`;
inputWindow.style.transform = "translate(-50%, -50%)";
inputWindow.style.width = "400px";
inputWindow.style.height = "30px";
inputWindow.style.overflow = "hidden";
inputWindow.style.overflowX = "hidden";
inputWindow.style.boxShadow = "0 0 10px 4px rgba(0, 0, 0, 0.2)";
inputWindow.style.borderRadius = "10px";
inputWindow.style.display = "none";
inputWindow.style.paddingBottom = "5px";
inputWindow.style.zIndex = "1000";
inputWindow.style.userSelect = "none";
inputWindow.style.color = "#CDCDCD";
document.body.appendChild(inputWindow);

let inputWindowIcon = document.createElement("img");
inputWindowIcon.src = inputIcon;
inputWindowIcon.style.position = "absolute";
inputWindowIcon.style.width = "22px";
inputWindowIcon.style.height = "22px";
inputWindowIcon.style.top = "6px";
inputWindowIcon.classList.add("icon");
inputWindow.appendChild(inputWindowIcon);

let inputBox = document.createElement("input");
inputBox.style.position = "absolute";
inputBox.style.width = "calc(100% - 40px)";
inputBox.style.height = "30px";
inputBox.style.background = "#FFFFFF00";
inputBox.style.fontFamily =
  "Cascadia Code, Consolas, Courier New, Menlo, ç»å¤å, monospace";
inputBox.style.borderColor = "transparent";
inputBox.style.outline = "none";
inputWindow.appendChild(inputBox);

function inputmessage(messageText) {
  switch (messageText.toLowerCase()) {
    case "help":
      if (defaultHelpMessage === "enable") {
        addText({
          message:
            "> " +
            lang(
              "help",
              'Help:<br><br>   Breakpoint: Pause the program for debugging, press<br>               "Continue" to resume execution.<br>   Console: A window for input and output.<br>   Output: Print text or variables at key points to debug.<br>   Input: Click the ">" button above to input,<br>          input can be detected as<br>          "when input" or "get last input".',
            ).replace(/ /g, "&nbsp;") +
            "<br>&nbsp;",
          innerHTML: true,
        });
      } else {
        lastInput = messageText;
        if (defaultHelpMessage === "completlydisable") {
          addText({ message: messageText, bullet: `$ ` });
        }
        vm.runtime.startHats("wsdebugger_whenInput");
      }
      break;
    default:
      addText({ message: messageText, bullet: `$ ` });
      lastInput = messageText;
      vm.runtime.startHats("wsdebugger_whenInput");
      break;
  }
}

inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    let messageText = inputBox.value;
    inputBox.value = "";
    inputmessage(messageText);
  }
});

inputButton.addEventListener("click", () => {
  const iptWdSty = inputWindow.style;
  if (iptWdSty.display === "none") iptWdSty.display = "block";
  else iptWdSty.display = "none";
});

let lastInput = "";

titleBar.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseup", handleMouseUp);

function handleMouseDown(event) {
  if (event.target === titleBar) {
    isDragging = true;

    offset.x = event.clientX - consoleWindow.offsetLeft;
    offset.y = event.clientY - consoleWindow.offsetTop;
  }
}

function handleMouseMove(event) {
  if (isDragging) {
    event.preventDefault();

    const newX = event.clientX - offset.x;
    const newY = event.clientY - offset.y;

    consoleWindow.style.left = newX + "px";
    consoleWindow.style.top = newY + "px";

    inputWindow.style.top = `calc(${consoleWindow.style.top} + 228px)`;
    inputWindow.style.left = !isRTL
      ? `calc(${getComputedStyle(consoleWindow).left} - 100px)`
      : "auto";
    inputWindow.style.right = isRTL
      ? `calc(${getComputedStyle(consoleWindow).right} + 100px)`
      : "auto";
  }
}

let lastTheme = localStorage.getItem("tw:theme");
let lastLanguage = localStorage.getItem("tw:language");

function checkLocalStorageChange() {
  if (consoleWindow.style.display == "block") {
    const currentTheme = localStorage.getItem("tw:theme");
    const currentLanguage = localStorage.getItem("tw:language");

    if (currentTheme !== lastTheme || currentLanguage !== lastLanguage) {
      changeWindowColor();
      lastTheme = currentTheme;
      lastLanguage = currentLanguage;
    }
  }
}

setInterval(checkLocalStorageChange, 500);

function changeWindowColor() {
  if (!forceTheme) {
    isDark = getDarkMode();
  }
  isRTL = rtlLang.includes(localStorage.getItem("tw:language"));
  inputWindow.style.top = `calc(${consoleWindow.style.top} + 228px)`;
  inputWindow.style.left = `calc(${consoleWindow.style.left} - 100px)`;
  inputWindow.style.left = !isRTL
    ? `calc(${getComputedStyle(consoleWindow).left} - 100px)`
    : "auto";
  inputWindow.style.right = isRTL
    ? `calc(${getComputedStyle(consoleWindow).right} + 100px)`
    : "auto";
  if (isRTL) {
    consoleWindow.style.direction = "rtl";
    inputWindow.style.direction = "rtl";
    inputWindowIcon.style.transform = "scaleX(-1)";
    closeButton.style.left = "12px";
    closeButton.style.right = "auto";
    clearButton.style.left = "60px";
    clearButton.style.right = "auto";
    inputButton.style.left = "108px";
    inputButton.style.right = "auto";
    inputButton.style.transform = "scaleX(-1)";
    inputBox.style.left = "auto";
    inputBox.style.right = "40px";
    inputWindowIcon.style.left = "auto";
    inputWindowIcon.style.right = "12px";
  } else {
    consoleWindow.style.direction = "ltr";
    inputWindow.style.direction = "ltr";
    inputWindowIcon.style.transform = "scaleX(1)";
    closeButton.style.left = "auto";
    closeButton.style.right = "12px";
    clearButton.style.left = "auto";
    clearButton.style.right = "60px";
    inputButton.style.left = "auto";
    inputButton.style.right = "108px";
    inputButton.style.transform = "scaleX(1)";
    inputBox.style.left = "40px";
    inputBox.style.right = "auto";
    inputWindowIcon.style.left = "12px";
    inputWindowIcon.style.right = "auto";
  }
  if (isDark) {
    consoleWindow.style.backgroundColor = "#111111";
    consoleWindow.style.color = "#FFF";
    titleBar.style.backgroundColor = "#1E1E1E";
    titleBar.style.color = "#FFF";
    closeButton.style.filter = "none";
    clearButton.style.filter = "none";
    inputButton.style.filter = "none";
    inputWindow.style.backgroundColor = "#787878";
    inputWindow.style.color = "#CDCDCD";
    inputWindowIcon.style.filter = "none";
  } else {
    consoleWindow.style.backgroundColor = "#FAFAFA";
    consoleWindow.style.color = "#474747";
    titleBar.style.backgroundColor = "#CDCDCD";
    titleBar.style.color = "#000";
    closeButton.style.filter = "invert(1)";
    clearButton.style.filter = "invert(1)";
    inputButton.style.filter = "invert(1)";
    inputWindow.style.backgroundColor = "#787878";
    inputWindow.style.color = "#CDCDCD";
  }
  inputWindow.style.color = "#CDCDCD";
}

function handleMouseUp() {
  isDragging = false;
}

function clearConsoleText() {
  content.innerHTML = "";
}

let lastLog = "";
let lastLogEncoded = "";
let lastLogColor = "";
let lastLogTimestamp;

function addText({ message, color, bullet = "", innerHTML = false }) {
  const logElement = document.createElement("div");
  logElement.style.color = color;
  logElement.style.fontSize = "16px";
  logElement.style.paddingLeft = "10px";
  logElement.style.paddingRight = "10px";

  if (innerHTML) {
    logElement.innerHTML = message;
  } else {
    let inner = isRTL
      ? `
                <div style="display: flex; justify-content: space-between; direction: rtl;">
                    ${bullet === "" ? "" : `<span>${bullet}</span><span>&nbsp;</span>`}
                    <span style="flex-grow: 1; text-align: right;">${message}</span>
                </div>
            `
      : `
                <div style="display: flex; justify-content: space-between; direction: ltr;">
                    ${bullet === "" ? "" : `<span>${bullet}</span><span>&nbsp;</span>`}
                    <span style="flex-grow: 1; text-align: left;">${message}</span>
                </div>
            `;
    logElement.innerHTML = inner;
  }

  content.appendChild(logElement);

  lastLog = message;
  lastLogEncoded = lastLog.replace(/ /g, "&nbsp;");
  lastLogColor = color ?? "";
  lastLogTimestamp = Date.now();

  while (content.children.length > maxMessage) {
    content.removeChild(content.children[0]);
  }
}

function addImg(base64ImageData) {
  const imageElement = document.createElement("img");
  imageElement.src = base64ImageData;
  imageElement.style.width = "162px";
  imageElement.style.margin = "10px";
  imageElement.style.imageRendering = "pixelated";
  content.appendChild(imageElement);

  content.appendChild(document.createElement("br"));

  while (content.children.length > maxMessage) {
    content.removeChild(content.children[0]);
  }
}

let maxMessage = 50;
addImg(
  "data:image/png;base64,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",
);
addText({
  color: "#808080",
  message: 'Type "help" for a list of commands',
});
class theshovel_console {
  getInfo() {
    return {
      id: "theshovelconsole",
      name: lang("wsdebugger.extName", "Debugger Console"),
      blocks: [
        "---",
        {
          opcode: "showConsole",
          blockType: BlockType.COMMAND,
          text: lang("wsdebugger.showConsole", "show console"),
        },
        {
          opcode: "hideConsole",
          blockType: BlockType.COMMAND,
          text: lang("wsdebugger.hideConsole", "hide console"),
        },
        {
          opcode: "consoleShown",
          blockType: BlockType.BOOLEAN,
          text: lang("wsdebugger.consoleShown", "console shown?"),
        },
        {
          opcode: "breakpoint",
          blockType: BlockType.COMMAND,
          text: lang("wsdebugger.breakpoint", "breakpoint"),
        },
        {
          opcode: "clearConsole",
          blockType: BlockType.COMMAND,
          text: lang("wsdebugger.clearConsole", "clear console"),
        },
        {
          opcode: "output",
          blockType: BlockType.COMMAND,
          text: lang("wsdebugger.output", "console [type] [message]"),
          arguments: {
            type: {
              type: ArgumentType.STRING,
              menu: "outputType",
            },
            message: {
              type: ArgumentType.STRING,
              defaultValue: "",
            },
          },
        },
        {
          opcode: "outputWithColor",
          blockType: BlockType.COMMAND,
          text: lang(
            "wsdebugger.outputWithColor",
            "output [message] color [color]",
          ),
          arguments: {
            message: {
              type: ArgumentType.STRING,
              defaultValue: "",
            },
            color: {
              type: ArgumentType.COLOR,
              defaultValue: "#61AFEF",
            },
          },
        },
        {
          opcode: "logStage",
          blockType: BlockType.COMMAND,
          text: lang("wsdebugger.logStage", "log stage"),
        },
        "---",
        {
          opcode: "whenInput",
          blockType: BlockType.EVENT,
          isEdgeActivated: false,
          text: "[ICON]" + lang("wsdebugger.whenInput", "when input"),
          arguments: {
            ICON: {
              type: ArgumentType.IMAGE,
              dataURI: inputIcon,
              flipRTL: true,
            },
          },
        },
        {
          opcode: "getLastInput",
          blockType: BlockType.REPORTER,
          text: "[ICON]" + lang("wsdebugger.getLastInput", "get last input"),
          arguments: {
            ICON: {
              type: ArgumentType.IMAGE,
              dataURI: inputIcon,
              flipRTL: true,
            },
          },
        },
        {
          opcode: "getLastLog",
          blockType: BlockType.REPORTER,
          text: "[ICON]" + lang("wsdebugger.getLastLog", "get last log [log]"),
          arguments: {
            ICON: {
              type: ArgumentType.IMAGE,
              dataURI: inputIcon,
              flipRTL: true,
            },
            log: {
              type: ArgumentType.STRING,
              menu: "logType",
            },
          },
        },
        {
          opcode: "sendMessageInput",
          blockType: BlockType.COMMAND,
          text:
            "[ICON]" +
            lang("wsdebugger.sendMessageInput", "send [message] in input"),
          arguments: {
            ICON: {
              type: ArgumentType.IMAGE,
              dataURI: inputIcon,
              flipRTL: true,
            },
            message: {
              type: ArgumentType.STRING,
              defaultValue: "help",
            },
          },
        },
      ],
      menus: {
        outputType: {
          acceptReporters: false,
          items: [
            {
              text: formatMessage({
                id: "wsdebugger.log",
                default: "log",
              }),
              value: "log",
            },
            {
              text: formatMessage({
                id: "wsdebugger.warn",
                default: "warn",
              }),
              value: "warn",
            },
            {
              text: formatMessage({
                id: "wsdebugger.error",
                default: "error",
              }),
              value: "error",
            },
          ],
        },
        logType: {
          acceptReporters: false,
          items: [
            {
              text: formatMessage({
                id: "wsdebugger.text",
                default: "Text (HTML)",
              }),
              value: "text",
            },
            {
              text: formatMessage({
                id: "wsdebugger.textEncoded",
                default: "Text (HTML with encodes)",
              }),
              value: "textEncoded",
            },
            {
              text: formatMessage({
                id: "wsdebugger.color",
                default: "color (HEX Code)",
              }),
              value: "color",
            },
            {
              text: formatMessage({
                id: "wsdebugger.timestamp",
                default: "Timestamp",
              }),
              value: "timestamp",
            },
          ],
        },
      },
    };
  }
  showConsole() {
    consoleWindow.style.left = "50%";
    consoleWindow.style.top = "50%";
    consoleWindow.style.display = "block";
    changeWindowColor();
    consoleWindowShown = true;
  }
  hideConsole() {
    consoleWindow.style.display = "none";
    inputWindow.style.display = "none";
    consoleWindowShown = false;
  }

  consoleShown() {
    return consoleWindowShown;
  }

  breakpoint() {
    vm.runtime.pause();
    consoleWindow.style.left = "50%";
    consoleWindow.style.top = "50%";
    consoleWindow.style.display = "block";
    changeWindowColor();
    consoleWindowShown = true;
  }

  ifFalseBreakpointAndLog({ boolean, message }) {
    boolean = Cast.toBoolean(boolean);
    if (!boolean) {
      addText({
        bullet: ">",
        message: message,
        color: "#E06C75",
      });
      this.breakpoint();
    }
  }

  clearConsole() {
    clearConsoleText();
  }

  output({ type, message }) {
    if (type === "log") {
      addText({ bullet: ">", message: message });
      return;
    }
    const outputColor = {
      warn: "#E5C07B",
      error: "#E06C75",
    };
    const bullet = {
      warn: ">",
      error: ">",
    };
    addText({
      bullet: bullet[type],
      message: message,
      color: outputColor[type],
    });
  }

  outputWithColor(args) {
    addText(args);
  }

  logStage() {
    new Promise((resolve) => {
      vm.runtime.renderer.requestSnapshot((uri) => {
        resolve(uri);
      });
    }).then((base64ImageData) => {
      addImg(base64ImageData);
    });
  }

  getLastInput() {
    return lastInput;
  }

  getLastLog(args) {
    if (args.log === "text") {
      return lastLog;
    } else if (args.log === "textEncoded") {
      return lastLogEncoded;
    } else if (args.log === "color") {
      return lastLogColor;
    } else if (args.log === "timestamp") {
      return lastLogTimestamp;
    } else {
      return "";
    }
  }

  sendMessageInput(args) {
    messageText = args.message;
    inputmessage(messageText);
    lastInput = messageText;
  }
}

module.exports = theshovel_console;
