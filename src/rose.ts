import * as ss from "steelseries"
import RGraph from './RGraph.rose.js'
import Tween from "./tween.js"
import { getCanvasContext, createBuffer, requestAnimFrame } from "./utils"
import { RoseParams } from "./rose-params"

/**
 * An add-on for {@link https://github.com/nicolas-van/steelseries | steelseries} library.
 *
 * Provides a rose chart round gauge.
 *
 * @packageDocumentation
 */
/**
 * Round Rose-Chart Gauge
 *
 * @remarks
 * require `steelseries` package installed or imported globally
 *
 * @example
 * Example passing directly the canvas id
 * ```ts
 * const rose = new Rose('canvasId', {
 * 		size: 200,
 * 		// ...
 * })
 * ```
 *
 * @example
 * Example passing the canvas element
 * ```ts
 * const canvas = document.getElementById('canvasId')
 * // or
 * const canvas = document.createElement('canvas')
 *
 * const rose = new Rose(canvas, {
 * 		// ...
 * })
 * ```
 *
 * @public
 */
export class Rose {
	/** Return current Rose value */
	getValue: () => number[];

	/** Change Rose value */
	setValue: (newValue: number[]) => this;

	/** Return current frame design */
	getFrameDesign: () => ss.ForegroundType;

	/**
	 * Set a new frame design
	 * @see steelseries.FrameDesign for design options
	 */
	setFrameDesign: (newFrameDesign: ss.FrameDesign) => this;

	/** Return current background color */
	getBackgroundColor: () => ss.BackgroundColor;

	/**
	 * Set a new background color
	 * @see steelseries.BackgroundColor for background color options
	 */
	setBackgroundColor: (newBackgroundColor: ss.BackgroundColor) => this;

	/** Return current foreground type */
	getForegroundType: () => ss.ForegroundType;

	/**
	 * Set a new foreground type
	 * @see steelseries.ForegroundType for foreground type options
	 */
	setForegroundType: (newForegroundType: ss.ForegroundType) => this;

	/** Return current odometer value */
	getOdoValue: () => number;

	/** Change odometer value */
	setOdoValue: (newValue: number) => this;

	/** Change odometer value, with animation */
	setOdoValueAnimated: (newValue: number, callback?: () => void) => this;

	/** Return current title string */
	getTitleString: () => string;

	/** Change title string */
	setTitleString: (newTitle: string | number) => this;

	/** Return current unit string */
	getUnitString: () => string;

	/** Change unit string */
	setUnitString: (newUnit: string) => this;

	/** Return current cardinal points symbols */
	getPointSymbols: () => string[];

	/**
	 * Change cardinal points symbols
	 * @param newPointSymbols - 4 or 8 elements array
	 */
	setPointSymbols: (newPointSymbols: string[]) => this;

	/** Repaint the gauge */
	repaint: () => void;

	/**
	 * @param canvas - canvas elemnt id, or canvas element itself
	 * @param parameters - gauge construction pasrameters
	 * @returns Instance of a Rose-Chart Gauge
	 */
	constructor (canvas: HTMLCanvasElement | string, parameters?: RoseParams) {
		// Get the canvas context
		const mainCtx = getCanvasContext(canvas)

		// Parameters
		parameters = parameters || {}
		const size = undefined === parameters.size
			? Math.min(mainCtx.canvas.width, mainCtx.canvas.height)
			: parameters.size
		let titleString = undefined === parameters.titleString
			? ""
			: parameters.titleString
		let unitString = undefined === parameters.unitString
			? ""
			: parameters.unitString
		let pointSymbols: string[] = undefined === parameters.pointSymbols
			? ["N", "E", "S", "W"]
			: parameters.pointSymbols

		let frameDesign = undefined === parameters.frameDesign
			? ss.FrameDesign.METAL
			: parameters.frameDesign
		const frameVisible = undefined === parameters.frameVisible ? true : parameters.frameVisible

		let backgroundColor = undefined === parameters.backgroundColor
			? ss.BackgroundColor.DARK_GRAY
			: parameters.backgroundColor
		const backgroundVisible = undefined === parameters.backgroundVisible
			? true
			: parameters.backgroundVisible

		let foregroundType = undefined === parameters.foregroundType
			? ss.ForegroundType.TYPE1
			: parameters.foregroundType
		const foregroundVisible = undefined === parameters.foregroundVisible
			? true
			: parameters.foregroundVisible

		const useOdometer = undefined === parameters.useOdometer ? false : parameters.useOdometer
		const odometerParams = undefined === parameters.odometerParams ? {} : parameters.odometerParams

		// Set the size - also clears the canvas
		mainCtx.canvas.width = size
		mainCtx.canvas.height = size

		// Constants
		const center = size / 2
		const plotSize = Math.floor(size * 0.68)
		const odoPosY = size * 0.7

		// Internal variables
		let value: number[] = []
		let odoValue = 0

		let tween: Tween
		let repainting = false

		let odoPosX: number

		let initialized = false

		// **************   Buffer creation  ********************
		const frameBuffer = createBuffer(size, size)
		let frameCtx = frameBuffer.getContext("2d")

		// Buffer for static background painting code
		const backgroundBuffer = createBuffer(size, size)
		let backgroundCtx = backgroundBuffer.getContext('2d')

		// Buffer for static foreground painting code
		const foregroundBuffer = createBuffer(size, size)
		let foregroundCtx = foregroundBuffer.getContext('2d')

		// Buffer for Rose chart plot
		const plotBuffer = createBuffer(plotSize, plotSize)

		let odoBuffer: HTMLCanvasElement
		let odoContext: CanvasRenderingContext2D | null
		let odoGauge: ss.Odometer

		if (useOdometer) {
			odoBuffer = createBuffer(10, 10)
			odoContext = odoBuffer.getContext('2d')
		}

		// **************   Image creation  ********************
		function drawCompassPoints (ctx: CanvasRenderingContext2D) {
			if ((pointSymbols.length !== 4) && (pointSymbols.length !== 8)) {
				return
			}

			const mul = (pointSymbols.length === 4) ? 1 : 2

			ctx.save()
			// set the font
			ctx.font = 0.08 * size + 'px serif'
			ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor()
			ctx.fillStyle = backgroundColor.labelColor.getRgbColor()
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'

			// Draw the compass points
			for (let i = 0; i < 4; i++) {
				ctx.translate(size / 2, size * 0.125)
				ctx.fillText(pointSymbols[i * mul], 0, 0, size)
				ctx.translate(-size / 2, -size * 0.125)
				// Move to center
				ctx.translate(size / 2, size / 2)
				ctx.rotate(Math.PI / 2)
				ctx.translate(-size / 2, -size / 2)
			}
			ctx.restore()
		}

		function drawOdoTitle (ctx: CanvasRenderingContext2D) {
			ctx.save()
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.font = `${0.05 * size}px Arial,Verdana,sans-serif`
			ctx.strokeStyle = backgroundColor.labelColor.getRgbaColor()
			ctx.fillStyle = backgroundColor.labelColor.getRgbaColor()
			ctx.fillText(unitString, size / 2, size * 0.67, size * 0.5)
			ctx.restore()
		}

		// **************   Initialization  ********************
		// Draw all static painting code to background
		const init = function (buffers?: { frame?: boolean; background?: boolean; rose?: boolean; foreground?: boolean; odo?: boolean; }) {
			buffers = buffers || {}
			const initFrame = undefined === buffers.frame ? false : buffers.frame
			const initBackground = undefined === buffers.background ? false : buffers.background
			const initRose = undefined === buffers.rose ? false : buffers.rose
			const initForeground = undefined === buffers.foreground ? false : buffers.foreground
			const initOdo = undefined === buffers.odo ? false : buffers.odo

			initialized = true

			if (initFrame && frameVisible && frameCtx) {
				ss.drawFrame(frameCtx, frameDesign, center, center, size, size)
			}

			if (initBackground && backgroundVisible && backgroundCtx) {
				ss.drawBackground(backgroundCtx, backgroundColor, center, center, size, size)

				drawCompassPoints(backgroundCtx)
			}

			if (initRose && value !== []) {
				// Create a new rose plot
				const rose = new RGraph.Rose(plotBuffer, value)
				rose.Set('chart.strokestyle', 'black')
				rose.Set('chart.background.axes.color', 'gray')
				rose.Set('chart.colors.alpha', 0.5)
				rose.Set('chart.colors', ['Gradient(#408040:red:#7070A0)'])
				rose.Set('chart.margin', Math.ceil(40 / value.length))

				rose.Set('chart.title', titleString)
				rose.Set('chart.title.size', Math.ceil(0.05 * plotSize))
				rose.Set('chart.title.bold', false)
				rose.Set('chart.title.color', backgroundColor.labelColor.getRgbColor())
				rose.Set('chart.gutter.top', 0.2 * plotSize)
				rose.Set('chart.gutter.bottom', 0.2 * plotSize)

				rose.Set('chart.tooltips.effect', 'snap')
				rose.Set('chart.labels.axes', '')
				rose.Set('chart.background.circles', true)
				rose.Set('chart.background.grid.spokes', 16)
				rose.Set('chart.radius', plotSize / 2)
				rose.Draw()
			}

			if (initForeground && foregroundVisible && foregroundCtx) {
				ss.drawForeground(foregroundCtx, foregroundType, size, size, false)
			}

			if (initOdo && useOdometer && odoContext) {
				odoGauge = new ss.Odometer('', {
					_context: odoContext,
					height: Math.ceil(size * 0.08),
					decimals: odometerParams.decimals === undefined ? 1 : odometerParams.decimals,
					digits: odometerParams.digits === undefined ? 4 : odometerParams.digits,
					valueForeColor: odometerParams.valueForeColor,
					valueBackColor: odometerParams.valueBackColor,
					decimalForeColor: odometerParams.decimalForeColor,
					decimalBackColor: odometerParams.decimalBackColor,
					font: odometerParams.font,
					value: odoValue
				})
				odoPosX = (size - odoBuffer.width) / 2
			}
		}

		const resetBuffers = function (buffers?: { frame?: boolean; background?: boolean; rose?: boolean; foreground?: boolean; }) {
			buffers = buffers || {}
			const resetFrame = undefined === buffers.frame ? false : buffers.frame
			const resetBackground = undefined === buffers.background ? false : buffers.background
			const resetPlot = undefined === buffers.rose ? false : buffers.rose
			const resetForeground = undefined === buffers.foreground ? false : buffers.foreground

			if (resetFrame && frameVisible) {
				frameBuffer.width = size
				frameBuffer.height = size
				frameCtx = frameBuffer.getContext("2d")
			}

			if (resetBackground && backgroundVisible) {
				backgroundBuffer.width = size
				backgroundBuffer.height = size
				backgroundCtx = backgroundBuffer.getContext('2d')
			}

			if (resetPlot) {
				plotBuffer.width = plotSize
				plotBuffer.height = plotSize
			}

			if (resetForeground && foregroundVisible) {
				foregroundBuffer.width = size
				foregroundBuffer.height = size
				foregroundCtx = foregroundBuffer.getContext('2d')
			}
		}

		// *********************************** Public methods **************************************
		this.getValue = function () {
			return value
		}

		this.setValue = function (newValue: number[]) {
			if (value !== newValue) {
				value = newValue
				resetBuffers({ rose: true })
				init({ rose: true })

				this.repaint()
			}
			return this
		}

		this.getOdoValue = function () {
			return odoValue
		}

		this.setOdoValue = function (newValue: number) {
			odoValue = newValue < 0 ? 0 : newValue
			this.repaint()
			return this
		}

		this.setOdoValueAnimated = function (newVal: number, callback?: () => void) {
			const gauge = this
			if (newVal < 0)
				newVal = 0

			if (odoValue !== newVal) {
				if (undefined !== tween && tween.playing()) {
					tween.stop()
				}

				tween = new Tween({}, '', Tween.strongEaseOut, odoValue, newVal, 2)
				tween.onMotionChanged = (event: any) => {
					odoValue = event.target._pos
					if (!repainting) {
						repainting = true
						requestAnimFrame(gauge.repaint)
					}
				}

				// do we have a callback function to process?
				if (callback && typeof callback === 'function') {
					tween.onMotionFinished = callback
				}

				tween.start()
			}
			return this
		}

		this.getTitleString = function () {
			return titleString
		}

		this.setTitleString = function (newTitle: string) {
			titleString = newTitle
			resetBuffers({ rose: true })
			init({ rose: true })
			this.repaint()
			return this
		}

		this.getUnitString = function () {
			return unitString
		}

		this.setUnitString = function (newUnit: string) {
			unitString = newUnit
			this.repaint()
			return this
		}

		this.getPointSymbols = function () {
			return pointSymbols
		}

		this.setPointSymbols = function (newPointSymbols: string[]) {
			if (newPointSymbols !== []) {
				pointSymbols = newPointSymbols
				resetBuffers({ background: true })
				init({ background: true })
				this.repaint()
			}
			return this
		}

		this.getFrameDesign = function () {
			return frameDesign
		}

		this.setFrameDesign = function (newFrameDesign) {
			resetBuffers({ frame: true })
			frameDesign = newFrameDesign
			init({ frame: true })
			this.repaint()
			return this
		}

		this.getBackgroundColor = function () {
			return backgroundColor
		}

		this.setBackgroundColor = function (newBackgroundColor) {
			backgroundColor = newBackgroundColor
			resetBuffers({ background: true, rose: true })
			init({ background: true, rose: true })
			this.repaint()
			return this
		}

		this.getForegroundType = function () {
			return foregroundType
		}

		this.setForegroundType = function (newForegroundType) {
			foregroundType = newForegroundType
			resetBuffers({ foreground: true })
			init({ foreground: true })
			this.repaint()
			return this
		}

		this.repaint = function () {
			if (!initialized) {
				init({
					frame: true,
					background: true,
					foreground: true, odo: useOdometer
				})
			}

			mainCtx.save()

			// Clear the canvas
			mainCtx.clearRect(0, 0, mainCtx.canvas.width, mainCtx.canvas.height)

			// Draw farme
			if (frameVisible) {
				mainCtx.drawImage(frameBuffer, 0, 0)
			}

			// Draw background
			if (backgroundVisible) {
				mainCtx.drawImage(backgroundBuffer, 0, 0)
			}

			// Paint the rose plot
			const offset = Math.floor(size / 2 - plotSize / 2)
			mainCtx.drawImage(plotBuffer, offset, offset)

			// Draw Odometer
			if (useOdometer) {
				odoGauge.setValue(odoValue)
				mainCtx.drawImage(odoBuffer, odoPosX, odoPosY)

				if (unitString !== "") {
					drawOdoTitle(mainCtx)
				}
			}

			// Draw foreground
			if (foregroundVisible) {
				mainCtx.drawImage(foregroundBuffer, 0, 0)
			}

			mainCtx.restore()

			repainting = false
		}

		// Visualize the component
		this.repaint()

		return this
	}
}
