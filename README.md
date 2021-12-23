<h1 align="center">Welcome to steelseries-rose-gauge 👋</h1>
<p>
  <a href="https://github.com/ricky-rebo/SteelSeries-Rose-Gauge#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ricky-rebo/SteelSeries-Rose-Gauge/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/ricky-rebo/SteelSeries-Rose-Gauge/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/ricky-rebo/steelseries-rose-gauge" />
  </a>
  <a href="https://twitter.com/ricky\_rebo" target="_blank">
    <img alt="Twitter: ricky\_rebo" src="https://img.shields.io/twitter/follow/ricky_rebo.svg?style=social" />
  </a>
</p>

> &nbsp;
> Wind Rose gauge addon for [nicolas-van/steelseries](https://github.com/nicolas-van/steelseries) gauges library.
> 
> &nbsp;Rose Chart by [RGraph](https://www.rgraph.net/canvas/rose.html), and rose workflow by [mcrossley/SteelSeries-Weather-Gauges](https://github.com/mcrossley/SteelSeries-Weather-Gauges)
> &nbsp;


### 🏠 [Homepage](https://github.com/ricky-rebo/SteelSeries-Rose-Gauge#readme)

## Install & Usage

### Using npm

```sh
npm i --save steelseries-rose-gauge
```

```ts
import { Rose } from "steelseries-rose-gauge";

const rose = new Rose("canvas-id-or-elem", { ... });
```


### Using a CDN

Use unpkg: https://unpkg.com/steelseries-rose-gauge

```html
...
<body>
  ...

  <canvas id="rose-canvas">
  
  ...
  
  <script src="https://unpkg.com/steelseries"></script>
  <script src="https://unpkg.com/steelseries-rose-gauge"></script>
  <script>
    const rose = new steelseriesRose.Rose("rose-canvas", { ... })
  </script>
</body>
```

## Documentation

See [documentation](https://ricky-rebo.github.io/SteelSeries-Rose-Gauge/)

## Author

👤 **[Riccardo Rebottini](https://github.com/ricky-rebo)**

* Website: https://www.rebottini.it
* Twitter: [@ricky_rebo](https://twitter.com/ricky\_rebo)
* Github: [@ricky-rebo](https://github.com/ricky-rebo)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ricky-rebo/SteelSeries-Rose-Gauge/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Riccardo Rebottini](https://github.com/ricky-rebo).<br />
This project is [MIT](https://github.com/ricky-rebo/SteelSeries-Rose-Gauge/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
