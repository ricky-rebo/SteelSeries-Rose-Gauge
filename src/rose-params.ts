import * as ss from "steelseries"

/**
 * Rose gauge construction parameters
 *
 * @public
 */
export interface RoseParams {
	/**
	 * Gauge size (px) - default: smaller dimension between `canvas.width` and `canvas.height`
	 */
	size?: number;

	/** * Gauge upper title string - default: `""` */
	titleString?: string;

	/**
	 * Gauge lower string title - default: `""`
	 * @remarks
	 * if {@link RoseParams.useOdometer|useOdometer} = `true`, it works as odometer title)
	 */
	unitString?: string;

	/**
	 * Cardinal points labels - default: `["N", "E", "S", "W"]`
	 * @remarks
	 * Must be 4 or 8 elements long
	 */
	pointSymbols?: string[];

	/**
	 * Gauge frame design - default: `steelseries.FrameDesign.METAL`
	 * @remarks
	 * ignored if {@link RoseParams.frameVisible|frameVisible} = `false`
	 */
	frameDesign?: ss.FrameDesign;

	/**
	 * Draw gauge frame? - default: `true`
	 */
	frameVisible?: boolean;

	/**
	 * Gauge background color - default: `steelseries.BackgroundColor.DARK_GRAY`
	 * @remarks
	 * ignored if {@link RoseParams.backgroundVisible|backgroundVisible} = `false`
	 */
	backgroundColor?: ss.BackgroundColor;

	/**
	 * Draw gauge background? - default: `true`
	 */
	backgroundVisible?: boolean;

	/**
	 * Gauge foreground type - default: `steelseries.ForegroundType.TYPE1`
	 * @remarks ignored if {@link RoseParams.foregroundVisible|foregroundVisible} = `false`
	 */
	foregroundType?: ss.ForegroundType;

	/**
	 * Draw gauge foreground? - default: `true`
	 */
	foregroundVisible?: boolean;

	/**
	 * Draw odometer? - default: `false`
	 */
	useOdometer?: boolean;

	/**
	 * Odometer construction params
	 * @remarks ignored if {@link RoseParams.useOdometer|useOdometer} = `false`
	 */
	odometerParams?: ss.OdometerParams;
}
