declare namespace RGraph {
	class Rose {
		constructor(canvas: HTMLCanvasElement | string, data: number[])
		Set(name: string, value: any): void
		Draw(): void
	}
}

export default RGraph;