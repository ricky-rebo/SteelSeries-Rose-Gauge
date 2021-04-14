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
> Wind Rose gauge addon for [nicolas-van/steelseries](https://nicolas-van.github.io/steelseries/) gauges library.
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
    const rose = new ssRose.Rose("rose-canvas", { ... })
  </script>
</body>
```

## Documentation

##### Constructor Params
<ul>
  <li> <b>size</b> (default: smaller dimension between width and height of the canvas): gauge size</li>
  <br/>
  <li> <b>titleString</b> (default: ""): gauge title </li>
  <br/>
  <li> <b>unitString</b> (default: ""): odometer title</li>
  <br/>
  <li> <b>pointSymbols</b> (default: ["N", "E", "S", "W"]): cardinal points labels </li>
  <br/>
  <li> 
    <b>frameDesign</b> (default: steelseries.FrameDesign.METAL): gauge frame design
    <p>See <a src="https://nicolas-van.github.io/steelseries/">nicolas-van/steelseries demo page</a> for all available frame designs</p> 
  </li>
  <br/>
  <li> <b>frameVisible</b> (default: true): draw the frame? </li>
  <br/>
  <li>
    <b>backgroundColor</b> (default: steelseries.BackgroundColor.DARK_GRAY): gauge background color
    <p>See <a src="https://nicolas-van.github.io/steelseries/">nicolas-van/steelseries demo page</a> for all available background colors</p>
  </li>
  <br/>
  <li> <b>backgroundVisible</b> (default: true): draw the background? </li>
  <br/>
  <li>
    <b>foregroundType</b> (default: steelseries.ForegroundType.TYPE1): gauge foreground type
    <p>See <a src="https://nicolas-van.github.io/steelseries/">nicolas-van/steelseries demo page</a> for all available foreground types</p>
  </li>
  <br/>
  <li> <b>foregroundVisible</b> (default: true): draw the foreground? </li>
  <br/>
  <li> <b>useOdometer</b> (default: false): show the odometer over the rose chart? </li>
  <br/>
  <li>
    <b>odometerParams</b>: the odometer parameters:
    <ul>
      <li> <b>decimals</b> (default: 1): number of decimal places </li>
      <li> <b>digits</b> (default: 4): number of integer digits </li>
      <li> <b>valueForeColor</b> (default: '#F8F8F8': digits text color) </li>
      <li> <b>valueBackColor</b> (default: '#050505'): digits background color </li>
      <li> <b>decimalForeColor</b> (default: '#F01010'): decimals text color </li>
      <li> <b>decimalBackColor</b> (default: '#F0F0F0'): decimals background color </li>
      <li> <b>font</b> (default: 'sans-serif'): value text font </li>
    </ul>
  </li>
</ul>

##### Constructor Params
<ul>
  <li>
    <b>constructor(elementOrId, params)</b>
    <ul>
      <li><u>elementOrId</u>: the canvas id or the canvas itself</li>
      <li><u>params</u> (optional): a set of parameters to configure the rose gauge (see the section above)</li>
    </ul>
  </li>
  <br/>
  <li>
    <b>setValue(newValue)</b>: set a new array of values and redraw the rose chart
  </li>
  <br/>
  <li>
    <b>getValue()</b>: returns the actual set of rose values
  </li>
  <br/>
  <li>
    <b>setFrameDesign(newFrameDesign)</b>: set a new frame design and redraw the gauge
  </li>
  <br/>
  <li>
    <b>setBackgroundColor(newBackgroundColor)</b>: set a new background color and redraw the gauge
  </li>
  <br/>
  <li>
    <b>setForegroundType(newForegroundType)</b>: set a new foreground type and redraw the gauge
  </li>
  <br/>
  <li>
    <b>setOdoValue(newValue)</b>: set a new value for the odometer and redraw the gauge
  </li>
  <br/>
  <li>
    <b>getOdoValue()</b>: return the actual odometer value
  </li>
  <br/>
  <li>
    <b>setOdoValueAnimated(newValue, callback)</b>: like setOdoValue(), but set the new value with an animation
    <ul>
      <li><u>callback</u> (optional): a callback function called when the animation ends</li>
    </ul>
  </li>
  <br/>
  <li>
    <b>setTitleString(newTitle)</b>: set a new rose chart title and redraw the gauge
  </li>
  <br/>
  <li>
    <b>setUnitString(newUnit)</b>: set a new odometer title and redraw the gauge
  </li>
  <br/>
  <li>
    <b>setPointSymbols(newPointSymbols)</b>: set a new array of cardinal point labels and redraw the gauge
  </li>
  <br/>
  <li>
    <b>repaint()</b>: redraw the gauge
  </li>
</ul>

## Author

👤 **[Riccardo Rebottini](https://github.com/ricky-rebo)**

* Website: https://www.rebottini.it
* Twitter: [@ricky\_rebo](https://twitter.com/ricky\_rebo)
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