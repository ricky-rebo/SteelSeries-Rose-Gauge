export function createBuffer (width: number, height: number) {
	const buffer = document.createElement('canvas')
	buffer.width = width
	buffer.height = height
	return buffer
}
export function getCanvasContext (elementOrId: HTMLCanvasElement | string) {
	const element = typeof elementOrId === 'string'
		? <HTMLCanvasElement>document.getElementById(elementOrId)
		: elementOrId
	return (element) ? element.getContext('2d') : null
}
export const requestAnimFrame = (function () {
	return (
		window.requestAnimationFrame ||
		(<any>window).webkitRequestAnimationFrame ||
		(<any>window).mozRequestAnimationFrame ||
		(<any>window).oRequestAnimationFrame ||
		(<any>window).msRequestAnimationFrame ||
		function (callback: FrameRequestCallback) {
			window.setTimeout(callback, 1000 / 16)
		}
	)
})()
