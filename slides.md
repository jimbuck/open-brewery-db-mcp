---
marp: true
theme: uncover
class: invert
size: 16:9
paginate: true
---

<style>
	:root {
		font-size: 30px;
	}

	h3 {
		text-align: left;
	}
</style>

# Designing an MCP Server
## Node.js & .NET Demo

---

## Overview

- **MCP (Model Context Protocol):** Bridge between AI and tools/data
- **Goal:** Rapidly build integrations for AI applications
- **Platforms:** TypeScript (Node.js) and C# (.NET)
- **Development Aid:** MCP Inspector

---

## Core MCP Concepts

- **Tools:** Actions (e.g., search, get details)
- **Resources:** Static data (e.g., schemas, docs)
- **Prompts:** Guide model behavior

---

## Authorization

<div class="diagram">
<svg aria-roledescription="sequence" role="graphics-document document" viewBox="-50 -10 1064 821" style="max-width: 700px;" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="100%" id="rn"><g><rect class="actor actor-bottom" ry="3" rx="3" name="T" height="65" width="201" stroke="#666" fill="#eaeaea" y="735" x="763"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="767.5" x="863.5"><tspan dy="0" x="863.5">Third-Party Auth Server</tspan></text></g><g><rect class="actor actor-bottom" ry="3" rx="3" name="M" height="65" width="150" stroke="#666" fill="#eaeaea" y="735" x="527.5"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="767.5" x="602.5"><tspan dy="0" x="602.5">MCP Server</tspan></text></g><g><rect class="actor actor-bottom" ry="3" rx="3" name="C" height="65" width="150" stroke="#666" fill="#eaeaea" y="735" x="269.5"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="767.5" x="344.5"><tspan dy="0" x="344.5">MCP Client</tspan></text></g><g><rect class="actor actor-bottom" ry="3" rx="3" name="B" height="65" width="185" stroke="#666" fill="#eaeaea" y="735" x="0"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="767.5" x="92.5"><tspan dy="0" x="92.5">User-Agent (Browser)</tspan></text></g><g><line name="T" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="735" x2="863.5" y1="65" x1="863.5" id="actor43"></line><g id="root-43"><rect class="actor actor-top" ry="3" rx="3" name="T" height="65" width="201" stroke="#666" fill="#eaeaea" y="0" x="763"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="863.5"><tspan dy="0" x="863.5">Third-Party Auth Server</tspan></text></g></g><g><line name="M" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="735" x2="602.5" y1="65" x1="602.5" id="actor42"></line><g id="root-42"><rect class="actor actor-top" ry="3" rx="3" name="M" height="65" width="150" stroke="#666" fill="#eaeaea" y="0" x="527.5"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="602.5"><tspan dy="0" x="602.5">MCP Server</tspan></text></g></g><g><line name="C" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="735" x2="344.5" y1="65" x1="344.5" id="actor41"></line><g id="root-41"><rect class="actor actor-top" ry="3" rx="3" name="C" height="65" width="150" stroke="#666" fill="#eaeaea" y="0" x="269.5"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="344.5"><tspan dy="0" x="344.5">MCP Client</tspan></text></g></g><g><line name="B" stroke="#999" stroke-width="0.5px" class="actor-line 200" y2="735" x2="92.5" y1="65" x1="92.5" id="actor40"></line><g id="root-40"><rect class="actor actor-top" ry="3" rx="3" name="B" height="65" width="185" stroke="#666" fill="#eaeaea" y="0" x="0"></rect><text style="text-anchor: middle; font-size: 16px; font-weight: 400; font-family: inherit;" class="actor actor-box" alignment-baseline="central" dominant-baseline="central" y="32.5" x="92.5"><tspan dy="0" x="92.5">User-Agent (Browser)</tspan></text></g></g><style>#rn{font-family:inherit;font-size:16px;fill:#ccc;}#rn .error-icon{fill:#a44141;}#rn .error-text{fill:#ddd;stroke:#ddd;}#rn .edge-thickness-normal{stroke-width:1px;}#rn .edge-thickness-thick{stroke-width:3.5px;}#rn .edge-pattern-solid{stroke-dasharray:0;}#rn .edge-thickness-invisible{stroke-width:0;fill:none;}#rn .edge-pattern-dashed{stroke-dasharray:3;}#rn .edge-pattern-dotted{stroke-dasharray:2;}#rn .marker{fill:lightgrey;stroke:lightgrey;}#rn .marker.cross{stroke:lightgrey;}#rn svg{font-family:inherit;font-size:16px;}#rn p{margin:0;}#rn .actor{stroke:#ccc;fill:#1f2020;}#rn text.actor&gt;tspan{fill:lightgrey;stroke:none;}#rn .actor-line{stroke:#ccc;}#rn .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:lightgrey;}#rn .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:lightgrey;}#rn #arrowhead path{fill:lightgrey;stroke:lightgrey;}#rn .sequenceNumber{fill:black;}#rn #sequencenumber{fill:lightgrey;}#rn #crosshead path{fill:lightgrey;stroke:lightgrey;}#rn .messageText{fill:lightgrey;stroke:none;}#rn .labelBox{stroke:#ccc;fill:#1f2020;}#rn .labelText,#rn .labelText&gt;tspan{fill:lightgrey;stroke:none;}#rn .loopText,#rn .loopText&gt;tspan{fill:lightgrey;stroke:none;}#rn .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:#ccc;fill:#ccc;}#rn .note{stroke:hsl(180, 0%, 18.3529411765%);fill:hsl(180, 1.5873015873%, 28.3529411765%);}#rn .noteText,#rn .noteText&gt;tspan{fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);stroke:none;}#rn .activation0{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#rn .activation1{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#rn .activation2{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:#ccc;}#rn .actorPopupMenu{position:absolute;}#rn .actorPopupMenuPanel{position:absolute;fill:#1f2020;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#rn .actor-man line{stroke:#ccc;fill:#1f2020;}#rn .actor-man circle,#rn line{stroke:#ccc;fill:#1f2020;stroke-width:2px;}#rn :root{--mermaid-font-family:inherit;}</style><g></g><defs><symbol height="24" width="24" id="computer"><path d="M2 2v13h20v-13h-20zm18 11h-16v-9h16v9zm-10.228 6l.466-1h3.524l.467 1h-4.457zm14.228 3h-24l2-6h2.104l-1.33 4h18.45l-1.297-4h2.073l2 6zm-5-10h-14v-7h14v7z" transform="scale(.5)"></path></symbol></defs><defs><symbol clip-rule="evenodd" fill-rule="evenodd" id="database"><path d="M12.258.001l.256.004.255.005.253.008.251.01.249.012.247.015.246.016.242.019.241.02.239.023.236.024.233.027.231.028.229.031.225.032.223.034.22.036.217.038.214.04.211.041.208.043.205.045.201.046.198.048.194.05.191.051.187.053.183.054.18.056.175.057.172.059.168.06.163.061.16.063.155.064.15.066.074.033.073.033.071.034.07.034.069.035.068.035.067.035.066.035.064.036.064.036.062.036.06.036.06.037.058.037.058.037.055.038.055.038.053.038.052.038.051.039.05.039.048.039.047.039.045.04.044.04.043.04.041.04.04.041.039.041.037.041.036.041.034.041.033.042.032.042.03.042.029.042.027.042.026.043.024.043.023.043.021.043.02.043.018.044.017.043.015.044.013.044.012.044.011.045.009.044.007.045.006.045.004.045.002.045.001.045v17l-.001.045-.002.045-.004.045-.006.045-.007.045-.009.044-.011.045-.012.044-.013.044-.015.044-.017.043-.018.044-.02.043-.021.043-.023.043-.024.043-.026.043-.027.042-.029.042-.03.042-.032.042-.033.042-.034.041-.036.041-.037.041-.039.041-.04.041-.041.04-.043.04-.044.04-.045.04-.047.039-.048.039-.05.039-.051.039-.052.038-.053.038-.055.038-.055.038-.058.037-.058.037-.06.037-.06.036-.062.036-.064.036-.064.036-.066.035-.067.035-.068.035-.069.035-.07.034-.071.034-.073.033-.074.033-.15.066-.155.064-.16.063-.163.061-.168.06-.172.059-.175.057-.18.056-.183.054-.187.053-.191.051-.194.05-.198.048-.201.046-.205.045-.208.043-.211.041-.214.04-.217.038-.22.036-.223.034-.225.032-.229.031-.231.028-.233.027-.236.024-.239.023-.241.02-.242.019-.246.016-.247.015-.249.012-.251.01-.253.008-.255.005-.256.004-.258.001-.258-.001-.256-.004-.255-.005-.253-.008-.251-.01-.249-.012-.247-.015-.245-.016-.243-.019-.241-.02-.238-.023-.236-.024-.234-.027-.231-.028-.228-.031-.226-.032-.223-.034-.22-.036-.217-.038-.214-.04-.211-.041-.208-.043-.204-.045-.201-.046-.198-.048-.195-.05-.19-.051-.187-.053-.184-.054-.179-.056-.176-.057-.172-.059-.167-.06-.164-.061-.159-.063-.155-.064-.151-.066-.074-.033-.072-.033-.072-.034-.07-.034-.069-.035-.068-.035-.067-.035-.066-.035-.064-.036-.063-.036-.062-.036-.061-.036-.06-.037-.058-.037-.057-.037-.056-.038-.055-.038-.053-.038-.052-.038-.051-.039-.049-.039-.049-.039-.046-.039-.046-.04-.044-.04-.043-.04-.041-.04-.04-.041-.039-.041-.037-.041-.036-.041-.034-.041-.033-.042-.032-.042-.03-.042-.029-.042-.027-.042-.026-.043-.024-.043-.023-.043-.021-.043-.02-.043-.018-.044-.017-.043-.015-.044-.013-.044-.012-.044-.011-.045-.009-.044-.007-.045-.006-.045-.004-.045-.002-.045-.001-.045v-17l.001-.045.002-.045.004-.045.006-.045.007-.045.009-.044.011-.045.012-.044.013-.044.015-.044.017-.043.018-.044.02-.043.021-.043.023-.043.024-.043.026-.043.027-.042.029-.042.03-.042.032-.042.033-.042.034-.041.036-.041.037-.041.039-.041.04-.041.041-.04.043-.04.044-.04.046-.04.046-.039.049-.039.049-.039.051-.039.052-.038.053-.038.055-.038.056-.038.057-.037.058-.037.06-.037.061-.036.062-.036.063-.036.064-.036.066-.035.067-.035.068-.035.069-.035.07-.034.072-.034.072-.033.074-.033.151-.066.155-.064.159-.063.164-.061.167-.06.172-.059.176-.057.179-.056.184-.054.187-.053.19-.051.195-.05.198-.048.201-.046.204-.045.208-.043.211-.041.214-.04.217-.038.22-.036.223-.034.226-.032.228-.031.231-.028.234-.027.236-.024.238-.023.241-.02.243-.019.245-.016.247-.015.249-.012.251-.01.253-.008.255-.005.256-.004.258-.001.258.001zm-9.258 20.499v.01l.001.021.003.021.004.022.005.021.006.022.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.023.018.024.019.024.021.024.022.025.023.024.024.025.052.049.056.05.061.051.066.051.07.051.075.051.079.052.084.052.088.052.092.052.097.052.102.051.105.052.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.048.144.049.147.047.152.047.155.047.16.045.163.045.167.043.171.043.176.041.178.041.183.039.187.039.19.037.194.035.197.035.202.033.204.031.209.03.212.029.216.027.219.025.222.024.226.021.23.02.233.018.236.016.24.015.243.012.246.01.249.008.253.005.256.004.259.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.021.224-.024.22-.026.216-.027.212-.028.21-.031.205-.031.202-.034.198-.034.194-.036.191-.037.187-.039.183-.04.179-.04.175-.042.172-.043.168-.044.163-.045.16-.046.155-.046.152-.047.148-.048.143-.049.139-.049.136-.05.131-.05.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.053.083-.051.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.05.023-.024.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.023.01-.022.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.127l-.077.055-.08.053-.083.054-.085.053-.087.052-.09.052-.093.051-.095.05-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.045-.118.044-.12.043-.122.042-.124.042-.126.041-.128.04-.13.04-.132.038-.134.038-.135.037-.138.037-.139.035-.142.035-.143.034-.144.033-.147.032-.148.031-.15.03-.151.03-.153.029-.154.027-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.01-.179.008-.179.008-.181.006-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.006-.179-.008-.179-.008-.178-.01-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.027-.153-.029-.151-.03-.15-.03-.148-.031-.146-.032-.145-.033-.143-.034-.141-.035-.14-.035-.137-.037-.136-.037-.134-.038-.132-.038-.13-.04-.128-.04-.126-.041-.124-.042-.122-.042-.12-.044-.117-.043-.116-.045-.113-.045-.112-.046-.109-.047-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.05-.093-.052-.09-.051-.087-.052-.085-.053-.083-.054-.08-.054-.077-.054v4.127zm0-5.654v.011l.001.021.003.021.004.021.005.022.006.022.007.022.009.022.01.022.011.023.012.023.013.023.015.024.016.023.017.024.018.024.019.024.021.024.022.024.023.025.024.024.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.052.11.051.114.051.119.052.123.05.127.051.131.05.135.049.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.044.171.042.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.022.23.02.233.018.236.016.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.012.241-.015.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.048.139-.05.136-.049.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.051.051-.049.023-.025.023-.024.021-.025.02-.024.019-.024.018-.024.017-.024.015-.023.014-.023.013-.024.012-.022.01-.023.01-.023.008-.022.006-.022.006-.022.004-.021.004-.022.001-.021.001-.021v-4.139l-.077.054-.08.054-.083.054-.085.052-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.049-.105.048-.106.047-.109.047-.111.046-.114.045-.115.044-.118.044-.12.044-.122.042-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.035-.143.033-.144.033-.147.033-.148.031-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.025-.161.024-.162.023-.163.022-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.011-.178.009-.179.009-.179.007-.181.007-.182.005-.182.004-.184.003-.184.002h-.37l-.184-.002-.184-.003-.182-.004-.182-.005-.181-.007-.179-.007-.179-.009-.178-.009-.176-.011-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.022-.162-.023-.161-.024-.159-.025-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.031-.146-.033-.145-.033-.143-.033-.141-.035-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.04-.126-.041-.124-.042-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.047-.105-.048-.102-.049-.1-.049-.097-.05-.095-.051-.093-.051-.09-.051-.087-.053-.085-.052-.083-.054-.08-.054-.077-.054v4.139zm0-5.666v.011l.001.02.003.022.004.021.005.022.006.021.007.022.009.023.01.022.011.023.012.023.013.023.015.023.016.024.017.024.018.023.019.024.021.025.022.024.023.024.024.025.052.05.056.05.061.05.066.051.07.051.075.052.079.051.084.052.088.052.092.052.097.052.102.052.105.051.11.052.114.051.119.051.123.051.127.05.131.05.135.05.139.049.144.048.147.048.152.047.155.046.16.045.163.045.167.043.171.043.176.042.178.04.183.04.187.038.19.037.194.036.197.034.202.033.204.032.209.03.212.028.216.027.219.025.222.024.226.021.23.02.233.018.236.017.24.014.243.012.246.01.249.008.253.006.256.003.259.001.26-.001.257-.003.254-.006.25-.008.247-.01.244-.013.241-.014.237-.016.233-.018.231-.02.226-.022.224-.024.22-.025.216-.027.212-.029.21-.03.205-.032.202-.033.198-.035.194-.036.191-.037.187-.039.183-.039.179-.041.175-.042.172-.043.168-.044.163-.045.16-.045.155-.047.152-.047.148-.048.143-.049.139-.049.136-.049.131-.051.126-.05.123-.051.118-.052.114-.051.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.052.07-.051.065-.051.06-.051.056-.05.051-.049.023-.025.023-.025.021-.024.02-.024.019-.024.018-.024.017-.024.015-.023.014-.024.013-.023.012-.023.01-.022.01-.023.008-.022.006-.022.006-.022.004-.022.004-.021.001-.021.001-.021v-4.153l-.077.054-.08.054-.083.053-.085.053-.087.053-.09.051-.093.051-.095.051-.097.05-.1.049-.102.048-.105.048-.106.048-.109.046-.111.046-.114.046-.115.044-.118.044-.12.043-.122.043-.124.042-.126.041-.128.04-.13.039-.132.039-.134.038-.135.037-.138.036-.139.036-.142.034-.143.034-.144.033-.147.032-.148.032-.15.03-.151.03-.153.028-.154.028-.156.027-.158.026-.159.024-.161.024-.162.023-.163.023-.165.021-.166.02-.167.019-.169.018-.169.017-.171.016-.173.015-.173.014-.175.013-.175.012-.177.01-.178.01-.179.009-.179.007-.181.006-.182.006-.182.004-.184.003-.184.001-.185.001-.185-.001-.184-.001-.184-.003-.182-.004-.182-.006-.181-.006-.179-.007-.179-.009-.178-.01-.176-.01-.176-.012-.175-.013-.173-.014-.172-.015-.171-.016-.17-.017-.169-.018-.167-.019-.166-.02-.165-.021-.163-.023-.162-.023-.161-.024-.159-.024-.157-.026-.156-.027-.155-.028-.153-.028-.151-.03-.15-.03-.148-.032-.146-.032-.145-.033-.143-.034-.141-.034-.14-.036-.137-.036-.136-.037-.134-.038-.132-.039-.13-.039-.128-.041-.126-.041-.124-.041-.122-.043-.12-.043-.117-.044-.116-.044-.113-.046-.112-.046-.109-.046-.106-.048-.105-.048-.102-.048-.1-.05-.097-.049-.095-.051-.093-.051-.09-.052-.087-.052-.085-.053-.083-.053-.08-.054-.077-.054v4.153zm8.74-8.179l-.257.004-.254.005-.25.008-.247.011-.244.012-.241.014-.237.016-.233.018-.231.021-.226.022-.224.023-.22.026-.216.027-.212.028-.21.031-.205.032-.202.033-.198.034-.194.036-.191.038-.187.038-.183.04-.179.041-.175.042-.172.043-.168.043-.163.045-.16.046-.155.046-.152.048-.148.048-.143.048-.139.049-.136.05-.131.05-.126.051-.123.051-.118.051-.114.052-.11.052-.106.052-.101.052-.096.052-.092.052-.088.052-.083.052-.079.052-.074.051-.07.052-.065.051-.06.05-.056.05-.051.05-.023.025-.023.024-.021.024-.02.025-.019.024-.018.024-.017.023-.015.024-.014.023-.013.023-.012.023-.01.023-.01.022-.008.022-.006.023-.006.021-.004.022-.004.021-.001.021-.001.021.001.021.001.021.004.021.004.022.006.021.006.023.008.022.01.022.01.023.012.023.013.023.014.023.015.024.017.023.018.024.019.024.02.025.021.024.023.024.023.025.051.05.056.05.06.05.065.051.07.052.074.051.079.052.083.052.088.052.092.052.096.052.101.052.106.052.11.052.114.052.118.051.123.051.126.051.131.05.136.05.139.049.143.048.148.048.152.048.155.046.16.046.163.045.168.043.172.043.175.042.179.041.183.04.187.038.191.038.194.036.198.034.202.033.205.032.21.031.212.028.216.027.22.026.224.023.226.022.231.021.233.018.237.016.241.014.244.012.247.011.25.008.254.005.257.004.26.001.26-.001.257-.004.254-.005.25-.008.247-.011.244-.012.241-.014.237-.016.233-.018.231-.021.226-.022.224-.023.22-.026.216-.027.212-.028.21-.031.205-.032.202-.033.198-.034.194-.036.191-.038.187-.038.183-.04.179-.041.175-.042.172-.043.168-.043.163-.045.16-.046.155-.046.152-.048.148-.048.143-.048.139-.049.136-.05.131-.05.126-.051.123-.051.118-.051.114-.052.11-.052.106-.052.101-.052.096-.052.092-.052.088-.052.083-.052.079-.052.074-.051.07-.052.065-.051.06-.05.056-.05.051-.05.023-.025.023-.024.021-.024.02-.025.019-.024.018-.024.017-.023.015-.024.014-.023.013-.023.012-.023.01-.023.01-.022.008-.022.006-.023.006-.021.004-.022.004-.021.001-.021.001-.021-.001-.021-.001-.021-.004-.021-.004-.022-.006-.021-.006-.023-.008-.022-.01-.022-.01-.023-.012-.023-.013-.023-.014-.023-.015-.024-.017-.023-.018-.024-.019-.024-.02-.025-.021-.024-.023-.024-.023-.025-.051-.05-.056-.05-.06-.05-.065-.051-.07-.052-.074-.051-.079-.052-.083-.052-.088-.052-.092-.052-.096-.052-.101-.052-.106-.052-.11-.052-.114-.052-.118-.051-.123-.051-.126-.051-.131-.05-.136-.05-.139-.049-.143-.048-.148-.048-.152-.048-.155-.046-.16-.046-.163-.045-.168-.043-.172-.043-.175-.042-.179-.041-.183-.04-.187-.038-.191-.038-.194-.036-.198-.034-.202-.033-.205-.032-.21-.031-.212-.028-.216-.027-.22-.026-.224-.023-.226-.022-.231-.021-.233-.018-.237-.016-.241-.014-.244-.012-.247-.011-.25-.008-.254-.005-.257-.004-.26-.001-.26.001z" transform="scale(.5)"></path></symbol></defs><defs><symbol height="24" width="24" id="clock"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" transform="scale(.5)"></path></symbol></defs><defs><marker orient="auto-start-reverse" markerHeight="12" markerWidth="12" markerUnits="userSpaceOnUse" refY="5" refX="7.9" id="arrowhead"><path d="M -1 0 L 10 5 L 0 10 z"></path></marker></defs><defs><marker refY="4.5" refX="4" orient="auto" markerHeight="8" markerWidth="15" id="crosshead"><path style="stroke-dasharray: 0, 0;" d="M 1,2 L 6,7 M 6,2 L 1,7" stroke-width="1pt" stroke="#000000" fill="none"></path></marker></defs><defs><marker orient="auto" markerHeight="28" markerWidth="20" refY="7" refX="15.5" id="filled-head"><path d="M 18,7 L9,13 L14,7 L9,1 Z"></path></marker></defs><defs><marker orient="auto" markerHeight="40" markerWidth="60" refY="15" refX="15" id="sequencenumber"><circle r="6" cy="15" cx="15"></circle></marker></defs><g><rect class="note" height="40" width="201" stroke="#666" fill="#EDF2AE" y="225" x="763"></rect><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="noteText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="230" x="864"><tspan x="864">User authorizes</tspan></text></g><g><rect class="note" height="40" width="229" stroke="#666" fill="#EDF2AE" y="475" x="488"></rect><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="noteText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="480" x="603"><tspan x="603">Generate bound MCP token</tspan></text></g><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="80" x="472">Initial OAuth Request</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="115" x2="598.5" y1="115" x1="345.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="130" x="349">Redirect to Third-Party /authorize</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="165" x2="96.5" y1="165" x1="601.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="180" x="477">Authorization Request</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="215" x2="859.5" y1="215" x1="93.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="280" x="480">Redirect to MCP Server callback</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="315" x2="96.5" y1="315" x1="862.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="330" x="346">Authorization code</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="365" x2="598.5" y1="365" x1="93.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="380" x="732">Exchange code for token</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="415" x2="859.5" y1="415" x1="603.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="430" x="735">Third-party access token</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="465" x2="606.5" y1="465" x1="862.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="530" x="349">Redirect to MCP Client callback</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="565" x2="96.5" y1="565" x1="601.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="580" x="217">MCP authorization code</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="615" x2="340.5" y1="615" x1="93.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="630" x="472">Exchange code for token</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="665" x2="598.5" y1="665" x1="345.5"></line><text style="font-family: inherit; font-size: 16px; font-weight: 400;" dy="1em" class="messageText" alignment-baseline="middle" dominant-baseline="middle" text-anchor="middle" y="680" x="475">MCP access token</text><line style="fill: none;" marker-end="url(#arrowhead)" stroke="none" stroke-width="2" class="messageLine0" y2="715" x2="348.5" y1="715" x1="601.5"></line></svg>
</div>

---

## Tools vs Resources

### Tools:
- Dynamic queries
- Require parameters
- Example: `brewery/search`

### Resources:
- Static, reusable data
- Context reference
- Example: `brewery://types`

---

## Naming Conventions

### Tools
- Action-oriented: `brewery/search`
- Namespaced and lowercase

### Resources
- Noun-based URIs: `brewery://types`
- Descriptive `name` and `description`

### Prompts
- Named by task: `find-breweries-by-city`
- Include arguments and intent

---

## Tool Design Best Practices

- One clear purpose per tool
- Return readable summaries and optional structured data
- Handle API errors, empty results, and bad inputs
- Use timeouts and error messages

---

## Example Prompt Templates

### `find-breweries-by-city`
- **Arg:** city
- **Guide:** Use `brewery/search`, summarize top 5 results

### `explain-brewery-type`
- **Arg:** type
- **Guide:** Refer to `brewery://types` for definitions

### `get-brewery-details`
- **Arg:** name
- **Guide:** Use `brewery/search`, present detailed info

---

## Input Handling

- Define clear input schemas using SDK tools
- Validate required vs optional fields
- Sanitize inputs (e.g., strings, URLs)
- Return friendly errors when validation fails

---

## Response Structure (Simplified)

- Use SDK `content` wrappers
- Text: User-readable summaries
- Code: Structured JSON blocks (if needed)
- `isError: true` for graceful error handling

---

## Testing and Debugging

- Use MCP Inspector:
  - View tools/resources/prompts
  - Test with different inputs
  - Monitor logs and errors

- Validate:
  - Edge cases
  - Error responses
  - Result structure

---

## Security and Performance

- Sanitize & validate all input
- Add timeouts and error handling for APIs
- Cache repeated queries if needed
- Avoid leaking sensitive debug info

---

# ✅ Summary

- Follow clear naming and schema conventions
- Use tools for dynamic actions, resources for static data
- Guide AI with well-crafted prompts
- Validate, test, and secure all inputs
- Leverage Inspector for development/debugging

---

## Thank You

Questions? Ready to build your own MCP server?

[https://modelcontextprotocol.org](https://modelcontextprotocol.org)
[https://www.openbrewerydb.org](https://www.openbrewerydb.org)
